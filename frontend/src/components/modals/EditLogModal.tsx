import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import BeverageSearchModal from "./SearchBeverageModal";
import Button from "../Button";
import Modal from "./BaseModal";
import { toCustomIsoFormat } from "../../utils/datetime";
import {
  ouncesToMilliliters,
  millilitersToOunces,
} from "../../utils/convertVolume";
import { type DrinkLog, updateDrinkLog } from "../../api/drinkLog";

interface EditLogModalProps {
  drinkLog: DrinkLog;
}

function EditLogModal({ drinkLog }: EditLogModalProps) {
  const [logDate, logTime] = toCustomIsoFormat(
    new Date(drinkLog.timestamp)
  ).split(" ");
  const [volume, setVolume] = useState(millilitersToOunces(drinkLog.volume));
  const [date, setDate] = useState(logDate);
  const [time, setTime] = useState(logTime.slice(0, 5));
  const { openModal, closeModal } = useModal();

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mL = ouncesToMilliliters(volume);
    const timestamp = `${date} ${time}`;
    await updateDrinkLog(drinkLog.id, timestamp, mL, drinkLog.beverage.id);
    const path = window.location.pathname;
    navigate(path);
    closeModal();
  }

  return (
    <Modal>
      <h1 className="font-display font-bold text-2xl">Edit this log:</h1>
      <p>Brand: {drinkLog.beverage.brand.name}</p>
      <p>Beverage: {drinkLog.beverage.name}</p>
      <p>Abv: {drinkLog.beverage.abv}%</p>
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
            max={logDate}
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
            // max={logTime}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="py-2 flex gap-2 justify-end">
          <Button variant="secondary" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditLogModal;
