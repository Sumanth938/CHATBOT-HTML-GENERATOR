import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Chat() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const generateCode = async () => {
    if (!input) return alert('Please enter a prompt.');

    setLoading(true);
    setShowPreview(false);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error("Gemini API key is missing.");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `Generate HTML and CSS code in a single file for: ${input} and also give preview`
      );
      const text = await result.response.text();

      console.log('Gemini AI Response:', text);

      // Extract HTML part using regex
      const htmlMatch = text.match(/```html\n([\s\S]*?)\n```/);
      if (htmlMatch) {
        const htmlCode = htmlMatch[1];
        console.log("Extracted HTML:\n", htmlCode);
        setInput("");
        setResponse(htmlCode);
      } else {
        console.log("HTML part not found.");
        setResponse(`<p>${text}</p>`);
      }
    } catch (error) {
      console.error('Gemini AI error:', error);
      alert('Error generating code. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 flex flex-row items-center">
      {session ? (
      <>
        <div className="flex space-x-4 w-full">
          <div className="w-1/2">
            <textarea
              className="border p-6 w-full mb-2"
              placeholder="Enter your prompt here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white p-2 rounded w-full mb-2"
                onClick={generateCode}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Code'}
              </button>
              {response && (
                <><button
                  className="bg-green-500 text-white p-2 rounded w-full mb-2"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button></>)}


            </div>
            <div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 bg-red-500 text-white rounded w-full mb-2"
              >
                Sign Out
              </button>
                <h1><b>Generated HTML code displayed here</b></h1>
                
              <div className="border p-2 w-full mb-2">
                <pre className="whitespace-pre-wrap">{response}</pre>
              </div>
            </div>
          </div>
          <div className="w-1/2">
          <h1><b>Preview of the HTML code</b> </h1>
            {response && (
              <>
              <button
                className="bg-yellow-500 text-white p-2 rounded w-full mb-2"
                onClick={() => {
                  const blob = new Blob([response], { type: 'text/html' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = 'generated.html';
                  link.click();
                }}
                >
                Download HTML File
                </button>
                {showPreview && (
                    <> 
                    <iframe
                    srcDoc={response}
                    title="HTML Preview"
                    sandbox="allow-scripts"
                    className="w-full h-[500px] border"
                    />
                    </>
                )}
              </>
            )}
          </div>
        </div>
      </>
       ) : null} 
    </div>
  );
}