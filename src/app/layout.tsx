import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from './../store/StoreProvider'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MBLogix Camion Driver Timesheet",
  description: "Efficient timesheet management for camion drivers in the transport industry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}