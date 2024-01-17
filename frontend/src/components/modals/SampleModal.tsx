import { useRef, useState } from "react";

import { useModal } from "../../context/ModalContext";

import Modal from "./BaseModal";
import useFocusTrap from "../../hooks/useFocusTrap";
import styles from "./SampleModal.module.css";
// import xIcon from "../assets/x.svg";

const sampleBeverageNames = [
  "Perpetual IPA",
  "Heady Topper",
  "Sip of Sunshine",
  "Downeast Original",
  "Modelo Especial",
  "Corona Extra",
  "Pabst Blue Ribbon",
  "Summer Shandy",
  "King Sue",
  "60 Minute IPA",
  "Sculpin",
  "Stone IPA",
  "Delicious IPA",
  "Jai Alai IPA",
  "Nugget Nectar",
  "Guinness",
  "All Day IPA",
  "Dale's Pale Ale",
  "Traditional Lager",
  "Storm King",
  "Fat Tire",
  "Hazy Little Thing IPA",
];

const simpleSearch = (query: string, toBeSearched: string) => {
  const escapedQuery = query.replace(/[^a-zA-Z0-9]/g, "");
  const pattern = new RegExp(escapedQuery.split("").join(".*") + ".*", "i");

  return pattern.test(toBeSearched);
};

const useFilteredBeverages = (text: string) => {
  let filteredNames: string[];

  if (text === "") {
    filteredNames = [];
  } else {
    filteredNames = sampleBeverageNames.filter((bev) => {
      // return bev.toLowerCase().startsWith(text.toLowerCase());
      return simpleSearch(text, bev);
    });
  }

  console.log("Filtered names:", filteredNames);

  return { filteredNames };
};

function SampleModal() {
  const { setModal } = useModal();
  const [searchText, setSearchText] = useState("");
  const ref = useRef(null);

  function handleClose() {
    setModal(null);
  }

  useFocusTrap(ref, handleClose);
  const { filteredNames } = useFilteredBeverages(searchText);

  return (
    <Modal>
      <button className={styles.xBtn} onClick={handleClose}>
        {/* <img src={xIcon} alt="X icon" width={24} height={24} /> */}X
      </button>
      <h1 className={styles.title}>Log a beverage!</h1>
      <label htmlFor="beverage-name">Beverage Name</label>
      <input
        id="beverage-name"
        name="beverage-name"
        list="beverage-name-list"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        autoFocus
      />
      <datalist id="beverage-name-list">
        {filteredNames.map((name, i) => (
          <option key={i} value={name}>
            {name}
          </option>
        ))}
      </datalist>
      <textarea name="Sample" placeholder="Uh write some more text?..." />
      <button className={styles.submitBtn} onClick={handleClose}>
        Go!
      </button>
    </Modal>
  );
}

export default SampleModal;
