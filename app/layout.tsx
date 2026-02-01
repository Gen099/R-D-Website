import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Fotober R&D Intelligence Hub",
    description: "Fotober R&D AI Video Intelligence Platform - Knowledge Base & Analytics Hub",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <link
                    href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen">
                {children}
            </body>
        </html>
    );
}
