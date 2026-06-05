import './globals.css';

export const metadata = {
  title: 'Learniverse — Your Learning Universe Starts Here',
  description: 'AI-powered learning. Real community. Zero limits. Join 10,000+ students and professionals already leveling up.',
  keywords: 'learning, AI tutor, online courses, community, jobs board, gamified learning',
  openGraph: {
    title: 'Learniverse — Your Learning Universe Starts Here',
    description: 'AI-powered learning platform with real community and zero limits.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-grain">
        {children}
      </body>
    </html>
  );
}
