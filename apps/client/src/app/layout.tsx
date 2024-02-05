import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import ClientProgress from "../components/client.progress";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Shortener",
  description: "Simple app to shortening links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          pauseOnFocusLoss
          pauseOnHover
          closeOnClick
          newestOnTop
          draggable
          rtl={false}
        />
        <Suspense fallback={null}>
          <ClientProgress>{children}</ClientProgress>
        </Suspense>
      </body>
    </html>
  );
}
