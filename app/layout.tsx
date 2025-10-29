import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Random Wheel | 随机轮盘",
  description: "A beautiful and interactive random wheel picker with smooth animations | 一个精美的交互式随机轮盘抽取工具",
  keywords: ["random wheel", "picker", "spinner", "random selector", "轮盘", "随机抽取"],
  authors: [{ name: "Random Wheel" }],
  openGraph: {
    title: "Random Wheel | 随机轮盘",
    description: "A beautiful and interactive random wheel picker",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
