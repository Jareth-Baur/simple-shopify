"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Sign in</h1>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
        className="bg-blue-800 text-white px-4 py-2 rounded"
      >
        Sign in with Facebook
      </button>

      <button
        onClick={() => signIn("credentials", { callbackUrl: "/" })}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Continue as Guest
      </button>
    </div>
  );
}
