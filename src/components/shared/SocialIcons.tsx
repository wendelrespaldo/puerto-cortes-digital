type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.58 14.24 3.58c-2.4 0-4.05 1.47-4.05 4.16V9.9H7.5V13h2.7v8h3.3Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4 4l6.9 8.6L4.3 20h2.3l5.5-6.2L16.9 20H20l-7.2-9L19.4 4h-2.3l-5.1 5.7L8.1 4H4Zm2.8 1.6h1.8l9 11.8h-1.8L6.8 5.6Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.02 2.5c-5.26 0-9.52 4.26-9.52 9.52 0 1.68.44 3.3 1.28 4.73L2.5 21.5l4.87-1.27a9.5 9.5 0 0 0 4.65 1.2h.01c5.26 0 9.52-4.26 9.52-9.52 0-2.54-.99-4.93-2.79-6.73a9.46 9.46 0 0 0-6.74-2.68Zm0 17.42h-.01a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-2.89.76.77-2.82-.19-.29a7.9 7.9 0 0 1-1.22-4.28c0-4.37 3.56-7.93 7.94-7.93 2.12 0 4.11.83 5.61 2.33a7.87 7.87 0 0 1 2.32 5.61c0 4.37-3.56 7.89-7.92 7.89Zm4.34-5.92c-.24-.12-1.4-.69-1.62-.77-.22-.08-.37-.12-.53.12-.16.24-.6.77-.74.92-.14.16-.27.18-.5.06-.24-.12-1-.37-1.9-1.17-.7-.62-1.18-1.39-1.31-1.63-.14-.24-.01-.36.1-.48.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.39-.4-.53-.4-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
