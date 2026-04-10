export function SiteLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2 L28 7 L28 16 C28 22.5 22.5 28 16 30 C9.5 28 4 22.5 4 16 L4 7 Z" fill="#1d3461" />
      <polygon points="16,8 17.8,13.5 23.5,13.5 18.9,17 20.6,22.5 16,19 11.4,22.5 13.1,17 8.5,13.5 14.2,13.5" fill="#ffffff" />
    </svg>
  );
}
