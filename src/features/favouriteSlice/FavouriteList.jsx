import { useDispatch, useSelector } from "react-redux";
import FavouriteItem from "./FavouriteItem";

export default function FavourList() {
  const { favourite } = useSelector((store) => store.country);

  return (
    <ul className="grid grid--4-cols">
      {favourite?.map((fav, id) => (
        <FavouriteItem country={fav} key={id} />
      ))}
    </ul>
  );
}
