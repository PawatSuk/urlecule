import { useEffect, useState } from "react";



/**
 * LinkResult fetches, displays and stores shortened URLs.
 *
 * @param {string} inputValue - URL to shorten
 * @param {Array} history - List of past shortened URLs
 * @param {Function} setHistory - Updates history in App.js
 */
const LinkResult = ({ inputValue, history, setHistory }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load cache from localStorage (or empty object)
  const cache = JSON.parse(localStorage.getItem("cache")) || {};

  /**
   * Call TinyURL API
   */
  const shortenUrl = async (longUrl) => {
    const res = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );
    return await res.text();
  };

  useEffect(() => {
    if (!inputValue) return;

    // 1️⃣ Check if URL exists in cache
    if (cache[inputValue]) {
      setShortenLink(cache[inputValue]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // 2️⃣ Call API
        const shortUrl = await shortenUrl(inputValue);

        // 3️⃣ Save to cache
        cache[inputValue] = shortUrl;
        localStorage.setItem("cache", JSON.stringify(cache));

        // 4️⃣ Save to history
        const newRecord = { long: inputValue, short: shortUrl };
        const updatedHistory = [newRecord, ...history]; // newest first
        setHistory(updatedHistory);

        // 5️⃣ Show to user
        setShortenLink(shortUrl);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue]);

  // Handle copied button effect
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timer);
  }, [copied]);

//   return (
//     <div className="result">
//       {loading && <p>Loading...</p>}
//       {shortenLink && (
//         <>
//           <p>{shortenLink}</p>

//           <CopyToClipboard
//             text={shortenLink}
//             onCopy={() => setCopied(true)}
//           >
//             <button className={copied ? "copied" : ""}>
//               {copied ? "Copied!" : "Copy"}
//             </button>
//           </CopyToClipboard>
//         </>
//       )}
//     </div>
//   );
};

export default LinkResult;
