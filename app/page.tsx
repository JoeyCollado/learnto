"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/pages/dashboard"); // Redirect to your custom folder
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>Sign in to access more features.</p>
    </div>
  );
}
