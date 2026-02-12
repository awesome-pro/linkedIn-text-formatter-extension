const boldMap: Record<string, string> = {
  'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
  'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
  'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
  'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
  'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
  'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
  '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
};

const italicMap: Record<string, string> = {
  'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫',
  'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵',
  'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
  'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑',
  'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛',
  'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
};

const boldItalicMap: Record<string, string> = {
  'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟',
  'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩',
  'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
  'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅',
  'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏',
  'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕'
};

const underlineMap: Record<string, string> = {
  'a': 'a̲', 'b': 'b̲', 'c': 'c̲', 'd': 'd̲', 'e': 'e̲', 'f': 'f̲', 'g': 'g̲', 'h': 'h̲', 'i': 'i̲', 'j': 'j̲',
  'k': 'k̲', 'l': 'l̲', 'm': 'm̲', 'n': 'n̲', 'o': 'o̲', 'p': 'p̲', 'q': 'q̲', 'r': 'r̲', 's': 's̲', 't': 't̲',
  'u': 'u̲', 'v': 'v̲', 'w': 'w̲', 'x': 'x̲', 'y': 'y̲', 'z': 'z̲',
  'A': 'A̲', 'B': 'B̲', 'C': 'C̲', 'D': 'D̲', 'E': 'E̲', 'F': 'F̲', 'G': 'G̲', 'H': 'H̲', 'I': 'I̲', 'J': 'J̲',
  'K': 'K̲', 'L': 'L̲', 'M': 'M̲', 'N': 'N̲', 'O': 'O̲', 'P': 'P̲', 'Q': 'Q̲', 'R': 'R̲', 'S': 'S̲', 'T': 'T̲',
  'U': 'U̲', 'V': 'V̲', 'W': 'W̲', 'X': 'X̲', 'Y': 'Y̲', 'Z': 'Z̲',
  '0': '0̲', '1': '1̲', '2': '2̲', '3': '3̲', '4': '4̲', '5': '5̲', '6': '6̲', '7': '7̲', '8': '8̲', '9': '9̲',
  ' ': ' '
};

const strikethroughMap: Record<string, string> = {
  'a': 'a̶', 'b': 'b̶', 'c': 'c̶', 'd': 'd̶', 'e': 'e̶', 'f': 'f̶', 'g': 'g̶', 'h': 'h̶', 'i': 'i̶', 'j': 'j̶',
  'k': 'k̶', 'l': 'l̶', 'm': 'm̶', 'n': 'n̶', 'o': 'o̶', 'p': 'p̶', 'q': 'q̶', 'r': 'r̶', 's': 's̶', 't': 't̶',
  'u': 'u̶', 'v': 'v̶', 'w': 'w̶', 'x': 'x̶', 'y': 'y̶', 'z': 'z̶',
  'A': 'A̶', 'B': 'B̶', 'C': 'C̶', 'D': 'D̶', 'E': 'E̶', 'F': 'F̶', 'G': 'G̶', 'H': 'H̶', 'I': 'I̶', 'J': 'J̶',
  'K': 'K̶', 'L': 'L̶', 'M': 'M̶', 'N': 'N̶', 'O': 'O̶', 'P': 'P̶', 'Q': 'Q̶', 'R': 'R̶', 'S': 'S̶', 'T': 'T̶',
  'U': 'U̶', 'V': 'V̶', 'W': 'W̶', 'X': 'X̶', 'Y': 'Y̶', 'Z': 'Z̶',
  '0': '0̶', '1': '1̶', '2': '2̶', '3': '3̶', '4': '4̶', '5': '5̶', '6': '6̶', '7': '7̶', '8': '8̶', '9': '9̶',
  ' ': ' '
};

const monoMap: Record<string, string> = {
  'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓',
  'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝',
  'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
  'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹',
  'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃',
  'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉',
  '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
};

function applyFormat(text: string, charMap: Record<string, string>): string {
  return text.split('').map(char => charMap[char] || char).join('');
}

export function toBold(text: string): string {
  return applyFormat(text, boldMap);
}

export function toItalic(text: string): string {
  return applyFormat(text, italicMap);
}

export function toBoldItalic(text: string): string {
  return applyFormat(text, boldItalicMap);
}

export function toUnderline(text: string): string {
  return applyFormat(text, underlineMap);
}

export function toStrikethrough(text: string): string {
  return applyFormat(text, strikethroughMap);
}

export function toMonospace(text: string): string {
  return applyFormat(text, monoMap);
}

export type FormatType = 'bold' | 'italic' | 'boldItalic' | 'underline' | 'strikethrough' | 'monospace';

export function formatText(text: string, format: FormatType): string {
  switch (format) {
    case 'bold':
      return toBold(text);
    case 'italic':
      return toItalic(text);
    case 'boldItalic':
      return toBoldItalic(text);
    case 'underline':
      return toUnderline(text);
    case 'strikethrough':
      return toStrikethrough(text);
    case 'monospace':
      return toMonospace(text);
    default:
      return text;
  }
}
