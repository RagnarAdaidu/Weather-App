import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "./features/countrySlice/CountrySlice";

export default function App() {
  const { countries: countriess } = useSelector((store) => store.country);

  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(countries());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
