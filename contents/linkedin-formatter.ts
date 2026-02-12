import type { PlasmoCSConfig } from "plasmo"

import { formatText, toPlainText, type FormatType } from "~utils/unicode-formatter"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"],
  all_frames: true,
  run_at: "document_idle"
}

const TOOLBAR_ID = "li-text-formatter-toolbar"

const FORMAT_BUTTONS: { format: FormatType; label: string; icon: string; tooltip: string }[] = [
  { format: "bold", label: "B", icon: "B", tooltip: "Bold" },
  { format: "italic", label: "I", icon: "𝐼", tooltip: "Italic" },
  { format: "boldItalic", label: "BI", icon: "𝑩", tooltip: "Bold Italic" },
  { format: "underline", label: "U", icon: "U̲", tooltip: "Underline" },
  { format: "strikethrough", label: "S", icon: "S̶", tooltip: "Strikethrough" },
  { format: "monospace", label: "M", icon: "𝙼", tooltip: "Monospace" }
]

function createToolbar(): HTMLDivElement {
  const toolbar = document.createElement("div")
  toolbar.id = TOOLBAR_ID
  toolbar.className = "li-formatter-toolbar"

  // Label
  const label = document.createElement("span")
  label.className = "li-formatter-label"
  label.textContent = "Format"
  toolbar.appendChild(label)

  // Separator after label
  const sep0 = document.createElement("div")
  sep0.className = "li-formatter-separator"
  toolbar.appendChild(sep0)

  FORMAT_BUTTONS.forEach((btnConfig, index) => {
    const btn = document.createElement("button")
    btn.className = "li-formatter-btn"
    btn.setAttribute("data-format", btnConfig.format)
    btn.setAttribute("title", btnConfig.tooltip)
    btn.type = "button"
    btn.innerHTML = `<span style="${btnConfig.format === "bold" || btnConfig.format === "boldItalic" ? "font-weight:700;" : ""}${btnConfig.format === "italic" || btnConfig.format === "boldItalic" ? "font-style:italic;" : ""}${btnConfig.format === "underline" ? "text-decoration:underline;" : ""}${btnConfig.format === "strikethrough" ? "text-decoration:line-through;" : ""}${btnConfig.format === "monospace" ? "font-family:monospace;" : ""}">${btnConfig.label}</span>`

    btn.addEventListener("mousedown", (e) => {
      e.preventDefault()
      e.stopPropagation()
    })

    btn.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      applyFormat(btnConfig.format)
    })

    toolbar.appendChild(btn)

    // Add separator after strikethrough (before monospace)
    if (index === 4) {
      const sep = document.createElement("div")
      sep.className = "li-formatter-separator"
      toolbar.appendChild(sep)
    }
  })

  // Separator
  const sep2 = document.createElement("div")
  sep2.className = "li-formatter-separator"
  toolbar.appendChild(sep2)

  // Clear formatting button
  const clearBtn = document.createElement("button")
  clearBtn.className = "li-formatter-btn"
  clearBtn.setAttribute("title", "Clear Formatting")
  clearBtn.type = "button"
  clearBtn.innerHTML = `<span style="font-size:12px;">✕</span>`
  clearBtn.addEventListener("mousedown", (e) => {
    e.preventDefault()
    e.stopPropagation()
  })
  clearBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    clearFormatting()
  })
  toolbar.appendChild(clearBtn)

  return toolbar
}

function getActiveEditor(): HTMLElement | null {
  // LinkedIn post editor selectors (they change occasionally)
  const selectors = [
    ".ql-editor[contenteditable='true']",
    "[role='textbox'][contenteditable='true']",
    ".editor-content[contenteditable='true']",
    "div[data-placeholder][contenteditable='true']"
  ]

  for (const selector of selectors) {
    const el = document.querySelector<HTMLElement>(selector)
    if (el) return el
  }
  return null
}

function getSelectedText(): { text: string; range: Range | null } {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) {
    return { text: "", range: null }
  }

  const range = selection.getRangeAt(0)
  const text = selection.toString()

  return { text, range }
}

function applyFormat(format: FormatType) {
  const { text, range } = getSelectedText()
  const editor = getActiveEditor()

  if (!editor) {
    showToast("Please open the LinkedIn post editor first")
    return
  }

  if (!text || !range) {
    showToast("Select some text to format")
    return
  }

  // Check if the selection is inside the editor
  if (!editor.contains(range.commonAncestorContainer)) {
    showToast("Select text inside the post editor")
    return
  }

  const formatted = formatText(text, format)

  // Replace the selected text
  range.deleteContents()
  const textNode = document.createTextNode(formatted)
  range.insertNode(textNode)

  // Move cursor to end of inserted text
  const newRange = document.createRange()
  newRange.setStartAfter(textNode)
  newRange.collapse(true)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(newRange)

  // Trigger input event so LinkedIn registers the change
  editor.dispatchEvent(new Event("input", { bubbles: true }))

  showToast(`Applied ${format} formatting`)
}

function clearFormatting() {
  const { text, range } = getSelectedText()
  const editor = getActiveEditor()

  if (!editor) {
    showToast("Please open the LinkedIn post editor first")
    return
  }

  if (!text || !range) {
    showToast("Select some text to clear formatting")
    return
  }

  if (!editor.contains(range.commonAncestorContainer)) {
    showToast("Select text inside the post editor")
    return
  }

  const plain = toPlainText(text)

  range.deleteContents()
  const textNode = document.createTextNode(plain)
  range.insertNode(textNode)

  const newRange = document.createRange()
  newRange.setStartAfter(textNode)
  newRange.collapse(true)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(newRange)

  editor.dispatchEvent(new Event("input", { bubbles: true }))

  showToast("Formatting cleared")
}

let toastTimeout: ReturnType<typeof setTimeout> | null = null

function showToast(message: string) {
  // Remove existing toast
  const existing = document.getElementById("li-formatter-toast")
  if (existing) existing.remove()
  if (toastTimeout) clearTimeout(toastTimeout)

  const toast = document.createElement("div")
  toast.id = "li-formatter-toast"
  toast.className = "li-formatter-toast"
  toast.textContent = message
  document.body.appendChild(toast)

  toastTimeout = setTimeout(() => {
    toast.style.opacity = "0"
    toast.style.transition = "opacity 0.3s ease"
    setTimeout(() => toast.remove(), 300)
  }, 2000)
}

function injectToolbar(editorContainer: HTMLElement) {
  // Don't inject if already present
  if (document.getElementById(TOOLBAR_ID)) return

  const toolbar = createToolbar()

  // Try to find the best place to insert the toolbar
  // LinkedIn's post modal structure: find the editor area and insert toolbar above it
  const modalContent =
    editorContainer.closest(".share-creation-state") ||
    editorContainer.closest(".share-box") ||
    editorContainer.closest("[role='dialog']") ||
    editorContainer.closest(".artdeco-modal__content")

  if (modalContent) {
    // Insert before the editor within the modal
    const editorWrapper =
      editorContainer.closest(".ql-container") ||
      editorContainer.parentElement

    if (editorWrapper) {
      editorWrapper.parentElement?.insertBefore(toolbar, editorWrapper)
    } else {
      modalContent.insertBefore(toolbar, modalContent.firstChild)
    }
  } else {
    // Fallback: insert before the editor
    editorContainer.parentElement?.insertBefore(toolbar, editorContainer)
  }
}

function removeToolbar() {
  const toolbar = document.getElementById(TOOLBAR_ID)
  if (toolbar) toolbar.remove()
}

function injectStyles() {
  if (document.getElementById("li-formatter-styles")) return

  const style = document.createElement("style")
  style.id = "li-formatter-styles"
  style.textContent = `
    .li-formatter-toolbar {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 6px 10px;
      margin: 8px 12px;
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 9999;
      flex-wrap: wrap;
    }

    .li-formatter-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 6px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: #444;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.15s ease;
      position: relative;
      user-select: none;
    }

    .li-formatter-btn:hover {
      background: #e3f2fd;
      color: #0a66c2;
    }

    .li-formatter-btn:active {
      background: #bbdefb;
      transform: scale(0.95);
    }

    .li-formatter-separator {
      width: 1px;
      height: 20px;
      background: #ddd;
      margin: 0 4px;
      flex-shrink: 0;
    }

    .li-formatter-label {
      font-size: 10px;
      color: #0a66c2;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-right: 2px;
      user-select: none;
    }

    .li-formatter-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0a66c2;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 4px 16px rgba(10, 102, 194, 0.3);
      z-index: 99999;
      animation: li-toast-slide-in 0.3s ease;
    }

    @keyframes li-toast-slide-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
  document.head.appendChild(style)
}

// Watch for LinkedIn's post editor to appear/disappear
function observeEditor() {
  const editorSelectors = [
    ".ql-editor[contenteditable='true']",
    "[role='textbox'][contenteditable='true']",
    "div[data-placeholder][contenteditable='true']"
  ]

  // Check periodically and also use MutationObserver
  const checkAndInject = () => {
    for (const selector of editorSelectors) {
      const editor = document.querySelector<HTMLElement>(selector)
      if (editor) {
        // Verify it's in a post creation context (not comments, messages, etc.)
        const isPostEditor =
          editor.closest(".share-creation-state") ||
          editor.closest(".share-box") ||
          editor.closest("[role='dialog']") ||
          editor.closest(".artdeco-modal")

        if (isPostEditor) {
          injectToolbar(editor)
          return
        }
      }
    }

    // No editor found, remove toolbar if it exists
    removeToolbar()
  }

  // Initial check
  checkAndInject()

  // MutationObserver for dynamic DOM changes
  const observer = new MutationObserver(() => {
    checkAndInject()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Also poll periodically as a fallback (LinkedIn uses complex rendering)
  setInterval(checkAndInject, 1500)
}

// Initialize
function init() {
  injectStyles()
  observeEditor()
  console.log("[LinkedIn Text Formatter] Extension loaded")
}

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
