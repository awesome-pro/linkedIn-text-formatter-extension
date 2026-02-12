# LinkedIn Text Formatter Extension

A Chrome/Firefox extension that allows you to format text directly in LinkedIn posts using Unicode characters. Add **bold**, *italic*, underline, strikethrough, and more to make your LinkedIn posts stand out!

## ✨ Features

- 🎨 **6 Text Styles**: Bold, Italic, Bold Italic, Underline, Strikethrough, and Monospace
- 🚀 **Direct Integration**: Formatting toolbar appears directly in LinkedIn's post creation dialog
- 📋 **Popup Preview**: Test and preview formatting before posting
- 🎯 **Easy to Use**: Select text and click a button to format
- 🌐 **Works Everywhere**: LinkedIn posts, comments, and messages

## 🚀 Getting Started

### Installation for Development

1. Install dependencies:
```bash
pnpm install
```

2. Run in development mode:
```bash
pnpm dev
```

3. Load the extension in your browser:
   - **Chrome**: Go to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", and select the `.output/chrome-mv3` folder
   - **Firefox**: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select any file in the `.output/firefox-mv2` folder

### Building for Production

```bash
pnpm build
```

The built extension will be in the `.output` folder.

## 📖 How to Use

### On LinkedIn (Recommended)

1. Go to [LinkedIn](https://linkedin.com) and start creating a post
2. A formatting toolbar will appear above the text editor
3. Type your text, then select the portion you want to format
4. Click one of the format buttons (Bold, Italic, etc.)
5. Your text will be instantly formatted with Unicode characters
6. Post as normal!

### Using the Popup

1. Click the extension icon in your browser toolbar
2. Type or paste your text in the input field
3. Select a format style
4. Copy the formatted text and paste it anywhere on LinkedIn

## 🎨 Available Formats

- **Bold**: 𝗕𝗼𝗹𝗱 𝗧𝗲𝘅𝘁
- **Italic**: 𝘐𝘵𝘢𝘭𝘪𝘤 𝘛𝘦𝘅𝘵
- **Bold Italic**: 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘
- **Underline**: U̲n̲d̲e̲r̲l̲i̲n̲e̲
- **Strikethrough**: S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶
- **Monospace**: 𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎

## 🛠️ Tech Stack

- **WXT**: Modern web extension framework
- **React**: UI components
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Unicode**: Text transformation

## 📝 How It Works

The extension uses Unicode mathematical alphanumeric symbols to create formatted text. These characters are supported by LinkedIn and display correctly across all devices and platforms.

The content script detects LinkedIn's post editor and injects a formatting toolbar. When you select text and click a format button, the extension replaces the selected text with its Unicode-formatted equivalent.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this extension for personal or commercial purposes.
