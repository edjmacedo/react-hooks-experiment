import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  const getResults = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, [query]);

  useEffect(() => {
    getResults();
  }, [getResults]);

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  }

  const handleClearSearch = event => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          value={query}
          type="text"
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">Search</button>
        <button type="button" className="bg-teal p-1 rounded" onClick={handleClearSearch}>Clear</button>
      </form>
      { loading ? (
        <div className="font-bold text-orange-dark">Loading results... </div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a className="text-indigo-dark hover:text-indigo-darkest" href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}
      { error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  )
}