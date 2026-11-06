import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const FacebookIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.5 1.5-1.5h1.7V3.9c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V10H6.8v3h2.7v8h4Z" />
  </svg>
)

export const LinkedInIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M6.5 8.3A1.8 1.8 0 1 0 6.5 4.7a1.8 1.8 0 0 0 0 3.6ZM4.9 9.8h3.2V20H4.9V9.8Zm5.2 0h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20h-3.2v-4.8c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V20H10V9.8Z" />
  </svg>
)

export const YouTubeIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
)

export const WhatsAppIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 2.4A9.6 9.6 0 0 0 3.7 17l-1.3 4.6 4.7-1.2A9.6 9.6 0 1 0 12 2.4Zm5.6 13.6c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.5-3.9-4.6-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.8 2 .9 2.1.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.4.5c-.1.1-.3.3-.1.6.1.3.6 1 1.3 1.7.9.8 1.7 1.1 2 1.2.2.1.4.1.5 0l.8-.9c.2-.2.3-.2.5-.1.2.1 1.5.7 1.8.8.2.1.4.2.5.3 0 .1 0 .7-.2 1.3Z" />
  </svg>
)

export const MailIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)
