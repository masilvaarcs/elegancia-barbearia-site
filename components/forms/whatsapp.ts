export function toWhatsAppUrl(phoneRaw: string, lines: string[]) {
  return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(lines.join("\n"))}`;
}
