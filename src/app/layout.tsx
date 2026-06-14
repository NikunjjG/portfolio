import React from 'react';
import '../index.css';

export const metadata = {
  title: 'Portfolio | Nikunj',
  description: 'An interactive neo-brutalist developer portfolio with a dynamic JSON form builder, interactive command console, and real-time performance optimization playground.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
      </body>
    </html>
  );
}
