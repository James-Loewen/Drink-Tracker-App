import { type FormEvent, type MouseEvent, useState } from "react";

import Modal from "./BaseModal";
import { useModal } from "../../context/ModalContext";
import Button from "../Button";
import { type Brand, queryBrands, createBrand } from "../../api/search";
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
      console.log("Handle validation errors here");
      return;
    }

    const data = await res.json();
    openModal(<CreateBeverageModal brand={data} />);
  }

  return (
    <Modal>
      <h1 className="font-display font-bold text-2xl">Add New Brand</h1>
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
