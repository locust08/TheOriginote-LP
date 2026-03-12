import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Originote | Nourish Your Skin",
  description: "Skincare landing page inspired by the provided Stitch markup.",
};

const themeInitScript = `
  try {
    const hour = new Date().getHours();
    const nextTheme = hour >= 7 && hour < 19 ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
  } catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
