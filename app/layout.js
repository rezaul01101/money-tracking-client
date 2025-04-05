import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/src/lib/Providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Money Manager",
  description:
    "Track and manage your personal expenses and income with our easy-to-use money management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
