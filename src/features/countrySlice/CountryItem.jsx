import { HiTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite, deleteCountry } from "./CountrySlice";
import OpenCountry from "./OpenCountry";
import { useSearchParams } from "react-router-dom";

export default function CountryItem({ country, countryId }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { favourite, countries: countriess } = useSelector(
    (store) => store.country
  );

  // const display = favourite.includes();

  function handleDelete(countryId) {
    dispatch(deleteCountry(countryId));
  }

  function handleClick() {
    searchParams.set("id", country.id);
    setSearchParams(searchParams);
  }

  function handleAdd(countryId) {
    let fav = favourite.find((fav) => fav.id === Number(countryId));
    if (fav) return;
    dispatch(addToFavourite(countryId));
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
        <div>
          <button
            className="countryItem-li-button"
            onClick={() => handleAdd(country.id)}
          >
            Add to Favourite
          </button>
        </div>
        <div onClick={handleClick}>
          <OpenCountry />
        </div>
      </li>
    </div>
  );
}
