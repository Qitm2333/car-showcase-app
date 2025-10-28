import { useNavigate } from "react-router-dom";
import Component02GbzLayout from "@/imports/inspiration-detail/02车型展示子层级GbzLayout";
import LeftNavOverlay from "@/components/LeftNavOverlay";

export default function CarShowcaseDetail() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 返回上一层级
  };

  return (
    <div className="min-h-screen w-full overflow-x-auto relative">
      <Component02GbzLayout onBackClick={handleBackClick} />
      <LeftNavOverlay />
    </div>
  );
}





