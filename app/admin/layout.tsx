import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // if (!session || session.user?.role !== "admin") {
  //   redirect("/"); // Kick non-admins out
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-6">
          {/* Clickable Admin Title */}
          <Link
            href="/admin/"
            className="text-2xl sm:text-3xl font-bold text-gray-800 hover:text-blue-600 transition"
          >
            Admin Dashboard
          </Link>

          {/* Optional: Add a logout or profile button later */}
          {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}
