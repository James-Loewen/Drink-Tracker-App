import { type FormEvent, type MouseEvent, useState, useEffect } from "react";

import { useModal } from "../../context/ModalContext";
import {
  type Brand,
  type Category,
  getCategories,
  createBeverage,
} from "../../api/search";

import Button from "../Button";
import Modal from "./BaseModal";

import LogBeverageModal from "./LogBeverageModal";
import SearchBrandModal from "./SearchBrandModal";

type FormOrMouseEvent =
  | FormEvent<HTMLFormElement>
  | MouseEvent<HTMLButtonElement>;

interface CreateBeverageModalProps {
  brand: Brand;
}

function CreateBeverageModal({ brand }: CreateBeverageModalProps) {
  const [name, setName] = useState("");
  const [abv, setAbv] = useState<number>(5.0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number>();

  const { openModal } = useModal();

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      setCategoryId(data[0].id);
    });
  }, []);

  async function handleSubmit(e: FormOrMouseEvent) {
    e.preventDefault();
    if (name === "" || categoryId === undefined) return;
    const res = await createBeverage(name, abv, categoryId, brand.id);

    if (res.status === 400) {
      console.log("TODO: Handle validation errors here...");
      /**
       * Whether I end up using Django Ninja or Django Rest Framework,
       * I should set up some standard validation error handling.
       */
      return;
    }

    const data = await res.json();
    openModal(<LogBeverageModal beverage={data} />);
  }

  const categoriesList = categories.map(({ id, category }) => (
    <option style={{ fontFamily: "sans-serif" }} key={id} value={id}>
      {category}
    </option>
  ));

  return (
    <Modal>
      <h2 className="font-display font-bold text-2xl">Add New Beverage</h2>
      <details className="cursor-pointer">
        <summary className="flex gap-1 items-center text-[#232232]">
          <span>Notice</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            // class="feather feather-info"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </summary>
        <div className="pl-2 border-l-4 border-danger/80">
          <p className="my-3">
            Note: All Brands and Beverages that you add{" "}
            <b>are associated with your user account</b>. This information is
            not publicly available to other users, but will be viewed by
            moderators.
          </p>
          <p className="my-3">
            Any submissions that violate application guidelines may result in a
            suspension or ban.
          </p>
        </div>
      </details>
      <span>Brand:</span>
      <div className="flex gap-1 items-center">
        <span className="font-display text-lg">{brand.name}</span>
      </div>
      <form className="flex flex-col gap-2 items-start" onSubmit={handleSubmit}>
        <input type="hidden" name="brand" value={brand.id} required />
        <label htmlFor="category">Category:</label>
        <select
          className="block font-sans"
          name="category"
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(+e.target.value)}
        >
          {categoriesList}
        </select>
        <label htmlFor="new-beverage-name">New Beverage Name:</label>
        <input
          type="text"
          name="new-beverage-name"
          id="new-beverage-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="abv">Abv:</label>
        <input
          type="number"
          name="abv"
          id="abv"
          value={abv}
          onChange={(e) => setAbv(+e.target.value)}
          step={0.1}
          min={0}
          max={99}
        />
        <div className="w-full flex gap-2 justify-end">
          <Button
            className="flex gap-2 items-center group"
            variant="secondary"
            onClick={() => openModal(<SearchBrandModal />)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:animate-pulse"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Brand Search
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            + Add
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateBeverageModal;
