import { useSelector } from "react-redux";
import CountryList from "../features/countrySlice/CountryList";

export default function Country() {
  const countries = useSelector((store) => store.country.countries);
  return (
    <>
      <h1 className="h1">Temperature of different countries</h1>
      <CountryList countriess={countries} />
    </>
  );
}
