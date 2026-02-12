import { useState } from 'react';
import { FormatType } from '@/lib/textFormatter';

const FormatterToolbar = () => {
  const [activeFormat, setActiveFormat] = useState<FormatType | null>(null);

  const handleFormat = (format: FormatType) => {
    setActiveFormat(format);
    window.postMessage({ type: 'FORMAT_TEXT', format }, '*');
    setTimeout(() => setActiveFormat(null), 200);
  };

  const buttons: { format: FormatType; icon: string }[] = [
    { format: 'bold', icon: '𝗕𝗼𝗹𝗱' },
    { format: 'italic', icon: '𝘐𝘵𝘢𝘭𝘪𝘤' },
    { format: 'boldItalic', icon: '𝗕𝗼𝗹𝗱 𝙄𝙩𝙖𝙡𝙞𝙘' },
    { format: 'underline', icon: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲' },
    { format: 'strikethrough', icon: 'S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶' },
    { format: 'monospace', icon: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {buttons.map(({ format, icon }) => (
          <button
            key={format}
            onClick={() => handleFormat(format)}
            title={format}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: activeFormat === format ? '#2563eb' : '#ffffff',
              color: activeFormat === format ? '#ffffff' : '#2563eb',
              border: activeFormat === format ? 'none' : '1px solid #bfdbfe',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxShadow: activeFormat === format ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (activeFormat !== format) {
                e.currentTarget.style.backgroundColor = '#eff6ff';
                e.currentTarget.style.borderColor = '#93c5fd';
              }
            }}
            onMouseLeave={(e) => {
              if (activeFormat !== format) {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#bfdbfe';
              }
            }}
          >
            <span>{icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormatterToolbar;
