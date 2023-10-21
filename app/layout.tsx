import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter, youngSerif, nunitoSans } from "./fonts";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense, cloneElement } from "react";
import { getServerSession } from "next-auth/next";

export const metadata = {
  title: "Geotory",
  description:
    "Geotory is an open, social repository of shapes, layers, maps, and other geo data.",
  twitter: {
    card: "summary_large_image",
    title: "Geotory",
    description:
      "Geotory is an open, social repository of shapes, layers, maps, and other geo data.",
    creator: "@mager",
  },
  metadataBase: new URL("https://geotory.com"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={cx(sfPro.variable, youngSerif.variable, nunitoSans.variable)}
      >
        <div className="flex h-screen flex-col justify-between">
          <Suspense fallback="...">
            <Nav session={session} />
          </Suspense>
          <main className="mb-auto flex w-full flex-col items-center justify-center py-32">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
