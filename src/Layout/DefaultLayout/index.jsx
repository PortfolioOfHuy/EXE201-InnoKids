import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Spin } from "antd";

function DefaultLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <div className="min-h-screen bg-background-color">
      <div className="flex flex-col min-h-screen">
        {/* Header - Fixed height */}
        <header className="sticky top-0 z-50 bg-realWhite shadow-md h-16">
          <Header />
        </header>

        {/* Main Content - với padding-top để tránh dính header */}
        <main className="flex-grow pt-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
              <Spin size="large" />
            </div>
          ) : (
            <div className="w-full min-h-[calc(100vh-4rem-80px)] container mx-auto px-4">
              {children}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-realWhite mt-auto">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default DefaultLayout;
