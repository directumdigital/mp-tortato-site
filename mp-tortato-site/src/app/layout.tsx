import type { Metadata } from "next";
import { Epilogue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-epilogue",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MP Tortato | Metalúrgica de base em Curitiba",
    template: "%s | MP Tortato",
  },
  description:
    "Metalúrgica de base em Curitiba. Transformamos aço em solução para indústria, construção, agronegócio e fabricantes de máquinas — engenharia, fabricação, implantação e manutenção sob o mesmo teto.",
  keywords: [
    "MP Tortato",
    "metalúrgica Curitiba",
    "metalúrgica de base",
    "estrutura metálica",
    "caldeiraria",
    "corte e dobra",
    "solda industrial",
    "fabricação metálica sob medida",
  ],
  icons: {
    icon: [{ url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" }],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${epilogue.variable} ${mono.variable} font-sans antialiased bg-white overflow-x-hidden`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
