import { useState } from "react"

import { formatText, type FormatType } from "~utils/unicode-formatter"

const FORMATS: { format: FormatType; label: string; preview: string; style: React.CSSProperties }[] = [
  { format: "bold", label: "Bold", preview: "𝗛𝗲𝗹𝗹𝗼", style: { fontWeight: 700 } },
  { format: "italic", label: "Italic", preview: "𝘏𝘦𝘭𝘭𝘰", style: { fontStyle: "italic" } },
  { format: "boldItalic", label: "Bold Italic", preview: "𝙃𝙚𝙡𝙡𝙤", style: { fontWeight: 700, fontStyle: "italic" } },
  { format: "underline", label: "Underline", preview: "H̲e̲l̲l̲o̲", style: { textDecoration: "underline" } },
  { format: "strikethrough", label: "Strikethrough", preview: "H̶e̶l̶l̶o̶", style: { textDecoration: "line-through" } },
  { format: "monospace", label: "Monospace", preview: "𝙷𝚎𝚕𝚕𝚘", style: { fontFamily: "monospace" } }
]

function IndexPopup() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [activeFormat, setActiveFormat] = useState<FormatType | null>(null)
  const [copied, setCopied] = useState(false)

  const handleFormat = (format: FormatType) => {
    if (!inputText.trim()) return
    setActiveFormat(format)
    setOutputText(formatText(inputText, format))
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!outputText) return
    await navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      width: 380,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: "#fff"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0a66c2 0%, #004182 100%)",
        padding: "16px 20px",
        color: "white"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700
          }}>
            Li
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>LinkedIn Text Formatter</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>Format your posts with style</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {/* Instructions */}
        <div style={{
          background: "#f0f7ff",
          border: "1px solid #cce0f5",
          borderRadius: 8,
          padding: "10px 12px",
          marginBottom: 16,
          fontSize: 12,
          color: "#333",
          lineHeight: 1.5
        }}>
          <strong style={{ color: "#0a66c2" }}>How to use:</strong>
          <br />
          <span>1. Open LinkedIn → Start a post</span>
          <br />
          <span>2. Type your text, select it</span>
          <br />
          <span>3. Click a format button in the toolbar above the editor</span>
          <br />
          <span style={{ fontSize: 11, color: "#666", marginTop: 4, display: "inline-block" }}>
            Or use this popup to format & copy text below ↓
          </span>
        </div>

        {/* Input */}
        <textarea
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
            if (activeFormat) {
              setOutputText(formatText(e.target.value, activeFormat))
              setCopied(false)
            }
          }}
          placeholder="Type or paste your text here..."
          style={{
            width: "100%",
            minHeight: 70,
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            fontSize: 13,
            fontFamily: "inherit",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => (e.target.style.borderColor = "#0a66c2")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />

        {/* Format Buttons */}
        <div style={{
          display: "flex",
          gap: 6,
          marginTop: 12,
          flexWrap: "wrap"
        }}>
          {FORMATS.map((f) => (
            <button
              key={f.format}
              onClick={() => handleFormat(f.format)}
              style={{
                padding: "6px 12px",
                border: activeFormat === f.format ? "1.5px solid #0a66c2" : "1px solid #ddd",
                borderRadius: 6,
                background: activeFormat === f.format ? "#e8f1fb" : "#fafafa",
                color: activeFormat === f.format ? "#0a66c2" : "#444",
                fontSize: 12,
                fontWeight: activeFormat === f.format ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease",
                ...f.style
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Output */}
        {outputText && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Formatted Output
            </div>
            <div style={{
              background: "#f8f9fa",
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 14,
              lineHeight: 1.6,
              wordBreak: "break-word",
              minHeight: 40
            }}>
              {outputText}
            </div>
            <button
              onClick={handleCopy}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "10px 0",
                background: copied ? "#2e7d32" : "#0a66c2",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s ease"
              }}
            >
              {copied ? "✓ Copied to Clipboard!" : "Copy to Clipboard"}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "10px 20px",
        borderTop: "1px solid #eee",
        textAlign: "center",
        fontSize: 11,
        color: "#999"
      }}>
        Works directly in LinkedIn's post editor
      </div>
    </div>
  )
}

export default IndexPopup
