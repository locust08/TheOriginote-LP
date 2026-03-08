import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Originote | Nourish Your Skin",
  description: "Skincare landing page inspired by the provided Stitch markup.",
};

const themeInitScript = `
  try {
    const savedTheme = localStorage.getItem("theme-mode");
    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
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
      </body>
    </html>
  );
}
