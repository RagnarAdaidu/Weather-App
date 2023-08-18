import { useDispatch, useSelector } from "react-redux";
import Search from "./components/Search";
import { singleCountry } from "./features/countrySlice/CountrySlice";
import Home from "./pages/Home";

export default function Homepage() {
  const dispatch = useDispatch();
  const { error, countries: countriess } = useSelector(
    (store) => store.country
  );

  const handleOnSearchChange = (searchData) => {
    // console.log(searchData)
    const [lat, lon] = searchData.value.split(" ");

    dispatch(singleCountry(lat, lon));
  };

  if (error) return <h1 className="error"> {error} </h1>;
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <Home />
    </div>
  );
}
