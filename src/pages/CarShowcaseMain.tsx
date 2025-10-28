import { useNavigate } from "react-router-dom";
import Component02ResahpeGbzLayout from "@/imports/inspiration-main/02车型展示ResahpeGbzLayout-1-1077";
import LeftNavOverlay from "@/components/LeftNavOverlay";

export default function CarShowcaseMain() {
  const navigate = useNavigate();

  const handleCarClick = (carId: string) => {
    navigate(`/car-showcase/1`);
  };

  return (
    <div className="min-h-screen w-full overflow-x-auto relative">
      <Component02ResahpeGbzLayout onCarClick={handleCarClick} />
      <LeftNavOverlay />
    </div>
  );
}





