/**
 * Utilitary function that truncates a text based on character count and floor to an exact word count
 * Also add '...' at the end of the substring
 * @param text Text to truncate
 * @param length expected length
 * @returns [cutText: string, isTextCut: boolean]
 */
export default function cutText (text: string, length: number) {
  if (text.length <= length) return [text, false];
  const rawCutText = text.substring(0, length);
  return [rawCutText.substring(0, Math.min(rawCutText.length, rawCutText.lastIndexOf(' '))) + '...', true];
};
