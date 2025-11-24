import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

/**
 * Component that fetches and displays the shortened URL.
 *
 * @component
 * @param {Object} props
 * @param {string} props.inputValue - The original URL to shorten
 */
const LinkResult = ({ inputValue }) => {
  /**
   * Shortened URL returned from the API.
   * @type {[string, Function]}
   */
  const [shortenLink, setShortenLink] = useState("");

  /**
   * Whether the text has been copied to clipboard.
   * @type {[boolean, Function]}
   */
  const [copied, setCopied] = useState(false);

  /**
   * Whether the API is loading.
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);

  /**
   * Stores error messages from API fetch.
   * @type {[string, Function]}
   */
  const [error, setError] = useState("");

  /**
   * Fetches a shortened URL from TinyURL API.
   *
   * @async
   * @function
   * @param {string} longUrl - The URL to shorten
   * @returns {Promise<string>} The shortened URL
   */
  const shortenUrl = async (longUrl) => {
    const res = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );
    return await res.text();
  };

  // Fetch API whenever inputValue changes
  useEffect(() => {
    if (!inputValue) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const shortUrl = await shortenUrl(inputValue);

        if (!shortUrl.startsWith("http")) {
          setError("Invalid URL or TinyURL error");
          setShortenLink("");
          return;
        }

        setShortenLink(shortUrl);
      } catch (err) {
        setError("Failed to shorten URL");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue]);

  // Reset "Copied" message after 1 second
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="result">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {shortenLink && !loading && (
        <>
          <p>{shortenLink}</p>

          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </CopyToClipboard>
        </>
      )}
    </div>
  );
};

export default LinkResult;
