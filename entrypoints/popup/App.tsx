import { useState } from 'react';
import { formatText, FormatType } from '@/lib/textFormatter';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<FormatType>('bold');
  const [copied, setCopied] = useState(false);

  const formats: { value: FormatType; label: string; }[] = [
    { value: 'bold', label: '𝗕𝗼𝗹𝗱' },
    { value: 'italic', label: '𝘐𝘵𝘢𝘭𝘪𝘤' },
    { value: 'boldItalic', label: '𝗕𝗼𝗹𝗱 𝙄𝙩𝙖𝙡𝙞𝙘' },
    { value: 'underline', label: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲' },
    { value: 'strikethrough', label: 'S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶' },
    { value: 'monospace', label: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎' },
  ];

  const formattedText = inputText ? formatText(inputText, selectedFormat) : '';

  const copyToClipboard = async () => {
    if (formattedText) {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className='w-[380px] p-6 bg-background'>
      <div className="mb-6">
        <h1 className='text-2xl font-bold text-foreground mb-1'>
          Text Formatter
        </h1>
        <p className='text-sm text-muted-foreground'>
          Transform your text with Unicode styles
        </p>
      </div>

      <div className="mb-4">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to format..."
          className="resize-none h-24"
        />
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-3 gap-2">
          {formats.map((format) => (
            <Button
              key={format.value}
              onClick={() => setSelectedFormat(format.value)}
              variant={selectedFormat === format.value ? 'default' : 'outline'}
              size="sm"
              className="h-8 text-xs"
            >
              {format.label}
            </Button>
          ))}
        </div>
      </div>

      {formattedText && (
        <div className="space-y-2">
          <Textarea
            value={formattedText}
            readOnly
            className="resize-none h-20 bg-muted/50"
          />
          <Button
            onClick={copyToClipboard}
            className='w-full'
            size="sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
