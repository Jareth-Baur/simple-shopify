"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="bg-gray-600 text-white px-3 py-1 rounded"
      >
        Logout ({session.user?.name})
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Login
    </button>
  );
}
