import { type FormEvent, useState } from "react";
import clsx from "clsx";
import { useModal } from "../../context/ModalContext";
import type { Beverage } from "../../api/search";
import { queryBeverages } from "../../api/search";

import Button from "../Button";
import Modal from "./BaseModal";
import LogBeverageModal from "./LogBeverageModal";
import BeverageCardButton from "../BeverageCardButton";

interface SearchBeverageResultProps {
  beverage: Beverage;
}

function SearchBeverageResult({ beverage }: SearchBeverageResultProps) {
  const { setModal } = useModal();

  return (
    <div
      onClick={() => setModal(<LogBeverageModal beverage={beverage} />)}
      className="px-2 py-1 border-2 border-blue-400 rounded-md"
    >
      <p className="text-gray-700">{beverage.brand.name}</p>
      <p className="text-gray-800 font-bold">{beverage.name}</p>
    </div>
  );
}

interface SearchBeverageModalProps {
  searchText?: string;
}

function SearchBeverageModal({ searchText = "" }: SearchBeverageModalProps) {
  const { setModal } = useModal();
  const [query, setQuery] = useState(searchText);
  const [results, setResults] = useState<Beverage[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  function handleClose() {
    setModal(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();

    if (q === "") {
      return;
    }

    setQuery(q);

    const data = await queryBeverages(q);
    setResults(data.results);
    setHasSearched(true);
  }

  const resultsArray = results.map((beverage) => (
    // <SearchBeverageResult beverage={beverage} />
    <BeverageCardButton beverage={beverage} />
  ));

  return (
    <Modal>
      <h2>Log a dang beverage</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="px-2 py-1 border border-black rounded-sm"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && (
        <div className="p-4 w-80 max-h-[50vh] overflow-auto flex flex-col gap-2">
          {resultsArray}
        </div>
      )}
      <div className={clsx("grid", { "grid-cols-2": hasSearched })}>
        <Button variant="secondary" onClick={handleClose} hidden={!hasSearched}>
          + New Beverage
        </Button>
        <Button
          variant="secondary"
          onClick={handleClose}
          className="justify-self-end"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default SearchBeverageModal;
