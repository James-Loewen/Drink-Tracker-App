import { type FormEvent, useState } from "react";
import clsx from "clsx";

import { useModal } from "../../context/ModalContext";
import { type Brand, queryBrands } from "../../api/search";

import Button from "../Button";
import Modal from "./BaseModal";
import BrandCardButton from "../BrandCardButton";
import CreateBrandModal from "./CreateBrandModal";

interface SearchBrandModalProps {
  searchText?: string;
}

function SearchBrandModal({ searchText = "" }: SearchBrandModalProps) {
  const { openModal } = useModal();
  const [query, setQuery] = useState(searchText);
  const [results, setResults] = useState<Brand[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();

    if (q === "") {
      return;
    }

    setQuery(q);

    const data = await queryBrands(q);
    setResults(data.results);
    setHasSearched(true);
  }

  const resultsList = results.map((brand) => <BrandCardButton brand={brand} />);

  return (
    <Modal>
      <h2 className="font-display font-bold text-2xl">Search for a brand</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <label className="sr-only" htmlFor="brand-search">
          Search
        </label>
        <input
          id="brand-search"
          name="brand-search"
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
      <div className={clsx("grid", { "grid-cols-2": hasSearched })}>
        <Button
          variant="secondary"
          onClick={() => openModal(<CreateBrandModal />)}
          className="justify-self-start"
          hidden={!hasSearched}
        >
          + New Brand
        </Button>
        {/* <Button
          variant="secondary"
          onClick={handleClose}
          className="justify-self-end"
        >
          Close
        </Button> */}
      </div>
    </Modal>
  );
}

export default SearchBrandModal;
