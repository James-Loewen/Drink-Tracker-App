import type { FormEvent } from "react";
import { deleteDrinkLog, type DrinkLog } from "../../api/drinkLog";
import { useModal } from "../../context/ModalContext";
import { millilitersToOunces } from "../../utils/convertVolume";
import { toTimeString } from "../../utils/datetime";
import Modal from "./BaseModal";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

interface DeleteLogModalProps {
  drinkLog: DrinkLog;
}

function DeleteLogModal({ drinkLog }: DeleteLogModalProps) {
  const { closeModal } = useModal();

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await deleteDrinkLog(drinkLog.id);
    const url = new URL(window.location.href);
    const path = url.pathname + url.search;
    navigate(path);
    closeModal();
  }

  return (
    <Modal>
      <h1 className="font-display font-bold text-xl">Delete this log?</h1>
      <p className="font-bold text-lg">
        {new Date(drinkLog.timestamp).toDateString()}
      </p>
      <p className="font-bold text-lg">
        {drinkLog.beverage.name}, {millilitersToOunces(drinkLog.volume, 1)} oz.,{" "}
        {toTimeString(new Date(drinkLog.timestamp))}
      </p>
      <p>Are you sure you want to delete this log?</p>
      <form onSubmit={handleSubmit} className="flex gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button variant="danger" type="submit">
          Delete
        </Button>
      </form>
    </Modal>
  );
}

export default DeleteLogModal;
