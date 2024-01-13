import { type FormEvent } from "react";

import { useState } from "react";

type ResultsArray = any[] | null;

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultsArray>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = new URL("http://localhost:8000/beverages/");
    url.searchParams.set("q", query);
    console.log(url);
    const res = await fetch(url, { credentials: "include" });
    const data = await res.json();
    console.log(data);

    setResults(data.results);
  }

  const resultsArray = results?.map((beverage) => (
    <div className="px-2 py-1 border-2 border-blue-400 rounded-sm">
      <p className="text-gray-700">{beverage.brand.name}</p>
      <p className="text-gray-800 font-bold">{beverage.name}</p>
    </div>
  ));

  return (
    <main className="p-8">
      <div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="px-2 py-1 border border-black rounded-sm"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {results && (
          <div className="p-4 w-80 overflow-auto flex flex-col gap-2">
            {resultsArray}
          </div>
        )}
      </div>
    </main>
  );
}

export default Search;
