import { useNavigate } from "react-router-dom";
import Component03FavoritesGbzLayout from "@/imports/favorites-main/03收藏夹页面GbzLayout";
import LeftNavOverlay from "@/components/LeftNavOverlay";

export default function FavoritesMain() {
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    navigate('/favorites/1');
  };

  return (
    <div className="min-h-screen w-full overflow-x-auto relative">
      <Component03FavoritesGbzLayout onFavoriteClick={handleFavoriteClick} />
      <LeftNavOverlay />
    </div>
  );
}





