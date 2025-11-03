import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/karmic/Hero";
import Footer from "@/components/karmic/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <Footer />
    </main>
  );
};

export default Index;
