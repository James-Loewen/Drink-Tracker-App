import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Beverage } from "../../api/search";
import { useModal } from "../../context/ModalContext";
import BeverageSearchModal from "./SearchBeverageModal";
import Button from "../Button";
import Modal from "./BaseModal";
import { toCustomIsoFormat } from "../../utils/datetime";
import { ouncesToMilliliters } from "../../utils/convertVolume";
import { postDrinkLog } from "../../api/drinkLog";

interface LogBeverageModalProps {
  beverage: Beverage;
}

function LogBeverageModal({ beverage }: LogBeverageModalProps) {
  const [currentDate, currentTime] = toCustomIsoFormat(new Date()).split(" ");
  const [volume, setVolume] = useState(12);
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime.slice(0, 5));
  const { setModal } = useModal();

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mL = ouncesToMilliliters(volume);
    const timestamp = `${date} ${time}`;
    const data = await postDrinkLog(timestamp, mL, beverage.id);
    const path = window.location.pathname;
    navigate(path);
    setModal(null);
  }

  return (
    <Modal>
      <h1 className="font-bold text-xl">Form for logging a beverage</h1>
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
            max={currentTime}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="py-2 flex gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={() =>
              setModal(<BeverageSearchModal searchText={beverage.name} />)
            }
          >
            Back
          </Button>
          <Button type="submit">+ Log</Button>
        </div>
      </form>
    </Modal>
  );
}

export default LogBeverageModal;
