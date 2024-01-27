import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Beverage } from "../../api/search";
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
  const [volumeUnit, setVolumeUnit] = useState<"oz" | "mL">("oz");
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
      <div className="grid grid-cols-[1fr,_4fr] gap-y-2 gap-x-4">
        <span>Brand:</span>
        <span className="font-display font-bold">{beverage.brand.name}</span>
        <span>Beverage:</span>
        <span className="font-display font-bold">{beverage.name}</span>
        <span>Abv:</span>
        <span className="font-display font-bold">{beverage.abv}%</span>
      </div>
      <form
        className="grid grid-cols-[1fr,_4fr] gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <label className="w-20" htmlFor="volume">
          Volume:
        </label>
        <div className="flex gap-4 justify-start items-baseline">
          <input
            name="volume"
            id="volume"
            type="number"
            value={volume}
            step={0.1}
            onChange={(e) => setVolume(+e.target.value)}
          />
          <select
            className="px-2 py-1 mr-6 bg-transparent border-b-[3px] border-[#232232] text-lg"
            name="volume-unit"
            id="volume-unit"
            value={volumeUnit}
            onChange={(e) => setVolumeUnit(e.target.value as "oz" | "mL")}
          >
            <option value="oz">oz</option>
            <option value="mL">mL</option>
          </select>
        </div>
        <label className="w-20" htmlFor="date">
          Date:
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
        <label className="w-20" htmlFor="time">
          Time:
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
        <div className="py-2 col-span-2 flex gap-2 justify-end">
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
