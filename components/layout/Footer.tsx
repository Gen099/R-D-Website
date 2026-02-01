export function Footer() {
    return (
        <footer className="mt-16 py-8 footer-gradient text-white">
            <div className="container mx-auto px-6 text-center">
                <p className="text-lg font-semibold mb-2">Fotober R&D Intelligence Hub</p>

                {/* Contact Links */}
                <div className="flex justify-center items-center gap-3 mb-3 text-sm">
                    <a
                        href="https://www.facebook.com/soncgvn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline opacity-90 hover:opacity-100 transition-opacity"
                    >
                        Facebook
                    </a>
                    <span className="opacity-75">•</span>
                    <a
                        href="https://zalo.me/0868689912"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline opacity-90 hover:opacity-100 transition-opacity"
                    >
                        Zalo: 0868689912
                    </a>
                    <span className="opacity-75">•</span>
                    <a
                        href="https://www.linkedin.com/in/sonpham07/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline opacity-90 hover:opacity-100 transition-opacity"
                    >
                        LinkedIn
                    </a>
                </div>

                <p className="text-sm opacity-90">© 2026 Fotober Media Company Limited. All rights reserved.</p>
                <p className="text-xs opacity-75 mt-2">Built with ❤️ using Next.js + Vercel Postgres</p>
            </div>
        </footer>
    );
}
