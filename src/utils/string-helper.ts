export function capitalize(
  sentence: string,
  separator?: string,
  join?: string
): string {
  if (sentence.length === 0) return sentence;

  const words = sentence.split(separator ?? " ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(join ?? " ");
}
