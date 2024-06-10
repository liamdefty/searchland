import "@searchland/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@searchland/trpc/react";

export const metadata = {
  title: "Searchland",
  description: "A demo project for Full Stack Tech Lead @ Searchland",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <main className="flex min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container gap-12 px-8 py-16 ">
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
