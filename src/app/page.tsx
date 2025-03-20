import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  console.log("session on home page: ", session);
  if (session) {
    redirect("/profile");
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 text-left">
          AI-powered recipe recommendations for your health
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Your personal recipe assistant, tailored for you.
        </p>
        <div className="mt-6">
          <Link
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            href="/register">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
