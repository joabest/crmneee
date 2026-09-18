import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MV CRM Consórcios",
  description: "Dashboard de CRM para gestão de consórcios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
