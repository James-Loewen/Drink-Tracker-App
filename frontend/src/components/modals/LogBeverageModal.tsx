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
    // window.location.assign(path);
    navigate(path);
    setModal(null);
  }

  return (
    <Modal>
      <h1 className="font-bold text-xl">Form for logging a beverage</h1>
      <p>Brand: {beverage.brand.name}</p>
      <p>Beverage: {beverage.name}</p>
      <p>Abv: {beverage.abv}%</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <Button type="submit">+ Log</Button>
      </form>
      <Button
        onClick={() =>
          setModal(<BeverageSearchModal searchText={beverage.name} />)
        }
      >
        Back
      </Button>
    </Modal>
  );
}

export default LogBeverageModal;
