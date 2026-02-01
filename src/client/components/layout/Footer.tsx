import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 footer-gradient text-white">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-semibold mb-2">Fotober R&D Intelligence Hub</p>
        <p className="text-sm opacity-90">© 2026 Fotober Media Company Limited. All rights reserved.</p>
        <p className="text-xs opacity-75 mt-2">Built with ❤️ using React + Hono + Cloudflare + AI</p>
      </div>
    </footer>
  );
};
