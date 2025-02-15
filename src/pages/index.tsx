"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const goToChat = () => {
    router.push('/chat');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🚀 Welcome to the Chatbot HTML & CSS Generator!</h1>

      {/* Info Section */}
      <div className="mt-6 text-center">
        <p className="text-gray-700">Generate HTML & CSS effortlessly using AI-powered chatbot.</p>
        <p className="text-sm text-gray-500">Built with Next.js, TypeScript, Tailwind CSS, and OpenAI.</p>
      </div>

      {session ? (
        <>
          <button
            onClick={goToChat}
            className="bg-purple-600 text-white px-6 py-3 rounded shadow hover:bg-purple-700 mb-4 mt-6"
          >
            Go to Chat
          </button>
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-700"
          >
            Sign Out
          </button>
        </>
      ) : (
        <div className="space-x-4 mb-6 mt-6">
          <Link href="/signin">
            <button className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}