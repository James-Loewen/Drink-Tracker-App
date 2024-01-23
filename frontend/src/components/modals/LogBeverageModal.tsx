import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Beverage } from "../../api/search";
import { useModal } from "../../context/ModalContext";
import { toCustomIsoFormat } from "../../utils/datetime";
import { ouncesToMilliliters } from "../../utils/convertVolume";
import { postDrinkLog } from "../../api/drinkLog";

import Button from "../Button";
import ReportButton from "../ReportButton";
import Modal from "./BaseModal";
import SearchBeverageModal from "./SearchBeverageModal";

interface LogBeverageModalProps {
  beverage: Beverage;
}

function LogBeverageModal({ beverage }: LogBeverageModalProps) {
  const [currentDate, currentTime] = toCustomIsoFormat(new Date()).split(" ");
  const [volume, setVolume] = useState(12);
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime.slice(0, 5));
  const { openModal, closeModal } = useModal();

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mL = ouncesToMilliliters(volume);
    const timestamp = `${date} ${time}`;
    await postDrinkLog(timestamp, mL, beverage.id);
    const path = window.location.pathname;
    navigate(path);
    closeModal();
  }

  return (
    <Modal>
      <ReportButton onClick={() => alert("Report!!!")} />
      <h1 className="font-display font-bold text-2xl">Log Details</h1>
      <p>Brand: {beverage.brand.name}</p>
      <p>Beverage: {beverage.name}</p>
      <p>Abv: {beverage.abv}%</p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex gap-2 items-center">
          <label className="w-20" htmlFor="volume">
            Volume
          </label>
          <input
            name="volume"
            id="volume"
            type="number"
            value={volume}
            step={0.1}
            onChange={(e) => setVolume(+e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="w-20" htmlFor="date">
            Date
          </label>
          <input
            name="date"
            id="date"
            type="date"
            value={date}
            max={currentDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="w-20" htmlFor="time">
            Time
          </label>
          <input
            name="time"
            id="time"
            type="time"
            value={time}
            // max={currentTime}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="py-2 flex gap-2 justify-end">
          <Button
            className="flex gap-2 items-center group"
            variant="secondary"
            onClick={() =>
              openModal(<SearchBeverageModal searchText={beverage.name} />)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="group-hover:animate-pulse"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Beverage Search
          </Button>
          <Button type="submit">+ Log</Button>
        </div>
      </form>
    </Modal>
  );
}

export default LogBeverageModal;
