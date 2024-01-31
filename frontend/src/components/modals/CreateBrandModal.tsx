import { type FormEvent, type MouseEvent, useState } from "react";

import { useModal } from "../../context/ModalContext";
import { createBrand } from "../../api/search";

import Modal from "./BaseModal";
import Button from "../Button";
import CreateBeverageModal from "./CreateBeverageModal";

type FormOrMouseEvent =
  | FormEvent<HTMLFormElement>
  | MouseEvent<HTMLButtonElement>;

function CreateBrandModal() {
  const [brandName, setBrandName] = useState("");
  const { openModal, closeModal } = useModal();

  async function handleSubmit(e: FormOrMouseEvent) {
    e.preventDefault();
    const newBrandName = brandName.trim();

    if (newBrandName === "") return;

    const res = await createBrand(newBrandName);

    if (res.status !== 201) {
      console.log("TODO: Handle validation errors here...");
      return;
    }

    const data = await res.json();
    openModal(<CreateBeverageModal brand={data} />);
  }

  return (
    <Modal>
      <h2 className="font-display font-bold text-2xl">Add New Brand</h2>
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="brand-name">Brand Name:</label>
        <input
          type="text"
          name="brand-name"
          id="brand-name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
      </form>
      <div className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
}

export default CreateBrandModal;
