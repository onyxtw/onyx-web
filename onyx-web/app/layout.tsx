import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONYX DEEP TECH STUDIO",
  description: "Next-generation edge computing & cloud systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
