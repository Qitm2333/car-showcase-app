import { useNavigate } from "react-router-dom";
import Component04FavoritesDetailGbzLayout from "@/imports/favorites-detail/04收藏夹详情页面GbzLayout";
import LeftNavOverlay from "@/components/LeftNavOverlay";

export default function FavoritesDetail() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/favorites');
  };

  return (
    <div className="min-h-screen w-full overflow-x-auto relative">
      <Component04FavoritesDetailGbzLayout onBackClick={handleBackClick} />
      <LeftNavOverlay />
    </div>
  );
}





