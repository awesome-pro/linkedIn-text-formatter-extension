import './style.css';
import { createRoot } from 'react-dom/client';
import FormatterToolbar from './FormatterToolbar';
import { formatText, FormatType } from '@/lib/textFormatter';

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  cssInjectionMode: 'ui',
  
  async main(ctx) {
    console.log('LinkedIn Text Formatter: Content script loaded');
    
    let currentEditor: HTMLElement | null = null;
    let toolbarContainer: HTMLElement | null = null;
    let reactRoot: any = null;

    function findLinkedInEditor(): HTMLElement | null {
      const selectors = [
        '.ql-editor[contenteditable="true"]',
        'div[contenteditable="true"][role="textbox"]',
        '.share-creation-state__text-editor .ql-editor',
        '.msg-form__contenteditable',
        'div[data-placeholder*="post"]',
        'div[data-placeholder*="Start a post"]',
        '.share-box__text-editor .ql-editor',
      ];

      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const el = element as HTMLElement;
          if (el && el.isContentEditable && el.offsetParent !== null) {
            console.log('LinkedIn Text Formatter: Found editor with selector:', selector);
            return el;
          }
        }
      }
      return null;
    }

    function injectToolbar(editor: HTMLElement) {
      if (toolbarContainer && reactRoot) {
        console.log('LinkedIn Text Formatter: Toolbar already injected');
        return;
      }

      console.log('LinkedIn Text Formatter: Attempting to inject toolbar');

      const postDialog = editor.closest('.share-creation-state__text-editor') ||
                        editor.closest('.msg-form__contenteditable') ||
                        editor.closest('.share-box__text-editor') ||
                        editor.parentElement?.parentElement;

      if (!postDialog) {
        console.log('LinkedIn Text Formatter: Could not find post dialog wrapper');
        return;
      }

      toolbarContainer = document.createElement('div');
      toolbarContainer.id = 'linkedin-formatter-toolbar';
      toolbarContainer.style.cssText = `
        position: relative;
        z-index: 9999;
        margin-bottom: 12px;
        width: 100%;
      `;

      const editorParent = editor.parentElement;
      if (editorParent) {
        editorParent.insertBefore(toolbarContainer, editor);
        console.log('LinkedIn Text Formatter: Toolbar container inserted');
        
        reactRoot = createRoot(toolbarContainer);
        reactRoot.render(<App />);
        console.log('LinkedIn Text Formatter: Toolbar rendered');
      }
    }

    function removeToolbar() {
      if (toolbarContainer) {
        console.log('LinkedIn Text Formatter: Removing toolbar');
        if (reactRoot) {
          reactRoot.unmount();
          reactRoot = null;
        }
        toolbarContainer.remove();
        toolbarContainer = null;
      }
    }

    function checkAndInject() {
      const editor = findLinkedInEditor();
      
      if (editor && editor !== currentEditor) {
        console.log('LinkedIn Text Formatter: New editor detected');
        removeToolbar();
        currentEditor = editor;
        setTimeout(() => injectToolbar(editor), 100);
      } else if (!editor && currentEditor) {
        console.log('LinkedIn Text Formatter: Editor removed');
        removeToolbar();
        currentEditor = null;
      }
    }

    const observer = new MutationObserver(() => {
      checkAndInject();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(checkAndInject, 500);
    setTimeout(checkAndInject, 1000);
    setTimeout(checkAndInject, 2000);

    window.addEventListener('message', (event) => {
      if (event.data.type === 'FORMAT_TEXT' && currentEditor) {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (!selectedText) return;

        const formattedText = formatText(selectedText, event.data.format as FormatType);
        
        range.deleteContents();
        const textNode = document.createTextNode(formattedText);
        range.insertNode(textNode);
        
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);

        const inputEvent = new Event('input', { bubbles: true });
        currentEditor.dispatchEvent(inputEvent);
      }
    });
  },
});

function App() {
  return <FormatterToolbar />;
}
