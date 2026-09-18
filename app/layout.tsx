import type { Metadata } from "next";
import AccessGate from "@/components/AccessGate";
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
      <body className="bg-bg text-ink antialiased">
        <AccessGate>{children}</AccessGate>
      </body>
    </html>
  );
}
