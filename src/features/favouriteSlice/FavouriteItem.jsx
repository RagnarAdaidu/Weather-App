import { HiTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
// import {
//   addToFavourite,
//   deleteCountry,
//   removeFromFavourite,
// } from "./CountrySlice";

import { useSearchParams } from "react-router-dom";
import OpenCountry from "../countrySlice/OpenCountry";
import { deleteCountry, deleteFavourite } from "../countrySlice/CountrySlice";

export default function FavouriteItem({ country }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { favourite } = useSelector((store) => store.country);

  // const display = favourite.includes();

  function handleDelete(countryId) {
    dispatch(deleteFavourite(countryId));
  }

  function handleClick() {
    searchParams.set("id", country.id);
    setSearchParams(searchParams);
  }

  // console.log("this is my country", country);

  return (
    <div>
      <li className="countryItem-li">
        <div className="first">
          <p>
            {country.name}, <span>{country.sys.country} </span>{" "}
          </p>
          <HiTrash onClick={() => handleDelete(country.id)} />
        </div>
        <div className="second">
          <p>Temperature</p>
          <p>{Math.round(country.main.temp)}°C</p>
        </div>
        <div onClick={handleClick}>
          <OpenCountry />
        </div>
      </li>
    </div>
  );
}
