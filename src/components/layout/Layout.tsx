
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background bg-mesh w-full">
      <Navbar />
      <main className="flex-grow pt-20 px-4 container mx-auto max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
