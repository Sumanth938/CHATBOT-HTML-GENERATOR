import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert('Sign up successful!');
      router.push('/signin');
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Error signing up');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-10 w-[26rem] rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-3 w-full rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border p-3 w-full rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="border p-3 w-full rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md text-lg">Sign Up</button>
        <p className="mt-6 text-center">
          Already have an account? <a href="/signin" className="text-blue-500">Sign In</a>
        </p>
      </form>
    </div>
  );
}