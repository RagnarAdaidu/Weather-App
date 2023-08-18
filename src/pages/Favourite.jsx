import React from "react";
import CountryList from "../features/countrySlice/CountryList";
import { useSelector } from "react-redux";
import FavourList from "../features/favouriteSlice/FavouriteList";

export default function Favourite() {
  const { favourite } = useSelector((store) => store.country);

  return (
    <>
      {favourite.length < 1 ? (
        <h1 className="no-fav">Favourite is empty</h1>
      ) : (
        <div className="fixedHeight">
          <h1>Favourites</h1>
          <FavourList />
        </div>
      )}
    </>
  );
}
