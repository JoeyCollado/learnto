"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle";
import { useState } from "react";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/pages/dashboard"); // Redirect to your custom folder
    }
  }, [isSignedIn, router]);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      setIsDarkMode(prefersDarkMode);
      document.documentElement.classList.toggle("dark", prefersDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
    <Navbar isDarkMode={isDarkMode}/>
    <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    <div className="mt-20">
      <h1 className="text-4xl text-center">Welcome to My Website</h1>
      <p className="text-center">Sign in to access more features.</p>
    </div>
    </>
  );
}
