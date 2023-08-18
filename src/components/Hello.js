import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setText } from "../features/countrySlice/CountrySlice";

export default function Hello() {
  const { countries, keepText } = useSelector((store) => store.country);
  const [searchParams] = useSearchParams();
  const [textArea, setTextArea] = useState("");
  // const [defaultValue, setDefaultValue] = useState("");
  const dispatch = useDispatch();

  const id = searchParams.get("id");

  console.log("waittttttt", keepText);

  const countryItem = countries.find((country) => country.id === Number(id));
  // if (!countryItem) return;

  useEffect(
    function () {
      if (!keepText) {
        return;
      } else {
        const findId = keepText.find((text) => text.id === Number(id));
        setTextArea(findId?.text || "");
      }
    },
    [id]
  );

  const { feels_like, temp, temp_max, temp_min, pressure, humidity } =
    countryItem?.main;

  const city = countryItem?.name;
  const description = countryItem?.weather.description || "";
  const { country: country_initials } = countryItem?.sys;

  function handleSave(countryId, textArea) {
    dispatch(setText(countryId, textArea));
  }
  return (
    <div className="country-temperature-details">
      <ul>
        <li>
          <h1>
            {city}, {country_initials}
          </h1>
        </li>
        <li className="li">
          <p>Temperature</p>
          <p>{temp}°C </p>
        </li>
        <li className="li">
          <p>Description</p>
          <p>{description} </p>
        </li>
        <li className="li">
          <p>Max temp of the day</p>
          <p>{temp_max}°C </p>
        </li>
        <li className="li">
          <p>Min temp of the day</p>
          <p>{temp_min}°C </p>
        </li>
        <li className="li">
          <p>Weather feels like</p>
          <p>{feels_like} </p>
        </li>
        <li className="li">
          <p>Humidity</p>
          <p>{humidity} </p>
        </li>
        <li className="li">
          <p>Pressure</p>
          <p>{pressure} </p>
        </li>
        <li>
          <input
            type="textarea"
            className="text-area-input"
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
        </li>
        <li>
          <button onClick={() => handleSave(id, textArea)}>Save</button>
        </li>
      </ul>
    </div>
  );
}
