"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      setMessage(`Welcome ${session.user?.name || "User"}! Redirecting...`);
      // Redirect after 1.5 seconds
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500);

      return () => clearTimeout(timer);
    } else if (status === "unauthenticated") {
      setMessage("");
    }
  }, [status, session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Sign in to Simple Shopify
        </h1>

        {message && (
          <p className="text-center text-green-600 font-medium animate-pulse">
            {message}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold transition transform hover:scale-105"
          >
            <img src="/icons/google.png" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          <button
            onClick={() => signIn("facebook")}
            className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition transform hover:scale-105"
          >
            <img src="/icons/facebook.png" alt="Facebook" className="w-5 h-5" />
            Sign in with Facebook
          </button>

          <button
            onClick={() => signIn("guest")}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-xl font-semibold transition transform hover:scale-105"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
