import { type FormEvent, useState } from "react";
import { useModal } from "../../context/ModalContext";
import type { Beverage } from "../../api/search";
import { queryBeverages } from "../../api/search";

import Button from "../Button";
import Modal from "./BaseModal";
import BeverageCardButton from "../BeverageCardButton";
import SearchBrandModal from "./SearchBrandModal";

interface SearchBeverageModalProps {
  searchText?: string;
}

function SearchBeverageModal({ searchText = "" }: SearchBeverageModalProps) {
  const { openModal } = useModal();
  const [query, setQuery] = useState(searchText);
  const [results, setResults] = useState<Beverage[]>([]);
  /**
   * This state triggers useFocusTrap reloads on every form submit
   * so that the newly loaded buttons are keyboard-focusable
   */
  const [hasSearched, setHasSearched] = useState(false);

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

  const resultsList = results.map((beverage) => (
    <BeverageCardButton beverage={beverage} />
  ));

  return (
    <Modal focusTrapTriggers={[hasSearched]}>
      <h2 className="font-display font-bold text-2xl">Search for a beverage</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <label className="sr-only" htmlFor="beverage-search">
          Search
        </label>
        <input
          id="beverage-search"
          name="beverage-search"
          className="px-2 py-1 border border-black rounded-sm"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </form>
      {results.length > 0 && (
        <div className="p-4 w-80 max-h-[50vh] overflow-auto flex flex-col gap-2">
          {resultsList}
        </div>
      )}
      {hasSearched && (
        <Button
          variant="secondary"
          onClick={() => openModal(<SearchBrandModal />)}
          className="mr-auto"
        >
          + New Beverage
        </Button>
      )}
    </Modal>
  );
}

export default SearchBeverageModal;
