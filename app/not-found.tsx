import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mb-8">Page Not Found</h2>
        <p className="text-xl text-gray-500 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
