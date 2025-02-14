"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Footer from "./components/Footer";
import ThemeToggle2 from "./components/ThemeToggle2";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/pages/dashboard"); // Redirect to your custom folder
    }
  }, [isSignedIn, router]);

  return (
    <>
    <ThemeToggle2/>
      <div className="mt-20 h-screen">
        <h1 className="text-7xl text-center font-bold">LearnTo</h1>
        <p className="text-center">Sign in to access more features.</p>
      </div>
      <Footer />
    </>
  );
}
