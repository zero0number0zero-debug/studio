import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { roboto, montserrat } from './fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'ProjectPM',
  description: 'Manage projects according to PMBOK guidelines.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "font-body antialiased",
          roboto.variable,
          montserrat.variable
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
