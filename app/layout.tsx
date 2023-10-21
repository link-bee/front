
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Link',
  description: 'Link',
}

export default function RootLayout({children}: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
