import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 flex flex-col overflow-clip">
        {children}
      </main>
    </>
  );
}
