import { useLoaderData } from "react-router-dom";
import type { BarDatum } from "@nivo/bar";
import BarChart from "../components/BarChart";
import { type DrinkLog } from "../api/drinkLog";
import Button from "../components/Button";
import SearchBeverageModal from "../components/modals/SearchBeverageModal";
import { useModal } from "../context/ModalContext";

interface WeekViewLoaderData {
  drinkLog: DrinkLog[];
  startDate: Date;
  endDate: Date;
  dataset: BarDatum[];
}

function WeekView() {
  const { dataset, startDate, endDate } = useLoaderData() as WeekViewLoaderData;
  const { setModal } = useModal();

  return (
    <>
      <div className="p-4">
        <h1 className="font-bold font-mono text-center text-xl">
          {startDate.toLocaleDateString()} – {endDate.toLocaleDateString()}
        </h1>
      </div>
      <BarChart data={dataset} />
      <Button onClick={() => setModal(<SearchBeverageModal />)}>
        Beverage Search Modal
      </Button>
    </>
  );
}

export default WeekView;
