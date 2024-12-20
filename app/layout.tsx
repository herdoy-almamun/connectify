import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-image-crop/dist/ReactCrop.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import QueryClientProvider from "./query-client-provider";
import SessionProvider from "./session-provider";
import SocketProvider from "./socket-provider";

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
  title: "Connectify",
  description: "Created by herdoycode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <SessionProvider>
            <Theme>
              <SocketProvider>{children}</SocketProvider>
            </Theme>
          </SessionProvider>
        </QueryClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
