import { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { options, url } from "../api";
// import { useDispatch } from "react-redux";
// import { addCountry } from "../features/countrySlice/CountrySlice";

export default function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${url}?minPopulation=10&namePrefix=${inputValue}`,
      // `${url}?minPopulation=10&namePrefix=${inputValue}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.country}, ${city.population}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  // console.log(search)
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}

// ons = async (inputValue) => {
//   async function fetchData() {
//     try {
//       const response = await fetch(`${url}?namePrefix=${inputValue}`, options);
//       const result = await response.text();
//       console.log(result);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   fetchData()
// };
