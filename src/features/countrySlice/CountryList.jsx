import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { countries } from "./CountrySlice";
import CountryItem from "./CountryItem";

export default function CountryList({ countriess }) {
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(countries());
    },
    [dispatch]
  );

  // console.log("hello countriesss", countriess);

  return (
    <ul className="grid grid--4-cols">
      {countriess?.map((country, id) => (
        <CountryItem country={country} key={id} />
      ))}
    </ul>
  );
}
