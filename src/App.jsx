import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // State variables
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch  joke
  const fetchJoke = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://v2.jokeapi.dev/joke/Any");
      setJoke(res.data);
    } catch (err) {
      setError("Failed to fetch joke. Try again!");
    } finally {
      setLoading(false);
    }
  };

  //Fetch joke once when the page loads
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl h-2/3 flex flex-col border border-black">
        <h2 className="text-2xl font-semibold mb-4 text-center">JOKE WARD</h2>
        <div className="flex-1 bg-gray-100 rounded-xl p-5 border border-black overflow-auto">
          {loading && (
            <p className="text-gray-500 text-center pt-20">Loading joke...</p>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && joke && (
            <>
              {joke.type === "single" ? (
                <p>{joke.joke}</p>
              ) : (
                <>
                  <p>
                    <strong>Setup:</strong> {joke.setup}
                  </p>
                  <p>
                    <strong>Delivery:</strong> {joke.delivery}
                  </p>
                </>
              )}
            </>
          )}
        </div>

        {/* Button for generating joke */}
        <button
          onClick={fetchJoke}
          className="p-2 mt-3 rounded-xl shadow-sm bg-yellow-300 hover:bg-yellow-400 active:scale-95 border border-black"
        >
          Generate Joke
        </button>
      </div>
    </div>
  );
}

export default App;
