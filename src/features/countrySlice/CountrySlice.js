import axios from "axios";
import { WEATHER_API_URL, weather_key } from "../../api";

const initialState = {
  countries: [],
  country: {},
  favourite: [],
  isLoading: false,
  keepText: [],
};

const cities = [
  { lon: 54.3968, lat: 24.4484 },
  { lon: 4.8936, lat: 52.3728 },
  { lon: 23.7294, lat: 37.9839 },
  { lon: 100.5167, lat: 13.75 },
  { lon: 2.1769, lat: 41.3825 },
  { lon: 116.4075, lat: 39.904 },
  // { lon: 13.4105, lat: 52.5244 },
  { lon: -74.0833, lat: 4.6115 },
  { lon: 4.3517, lat: 50.8503 },
  { lon: -58.3816, lat: -34.6037 },
  { lon: 31.2358, lat: 30.0444 },
  { lon: 18.5, lat: -34 },
  { lon: -87.65, lat: 41.85 },
  { lon: 77.2167, lat: 28.6667 },
  { lon: 90.3944, lat: 23.7289 },
  { lon: 55.3075, lat: 25.2694 },
];

export default function countriesReducer(state = initialState, action) {
  switch (action.type) {
    case "fetch/countries":
      return {
        ...state,
        countries: action.payload,
        isLoading: false,
        error: null,
      };
    case "fetch/country":
      return {
        ...state,
        countries: [...state.countries, action.payload],
      };
    case "add/favourite":
      const addNewItem = state.countries.find(
        (countries) => countries.id === Number(action.payload)
      );
      return {
        ...state,
        favourite: [...state.favourite, addNewItem],
      };
    case "add/text":
      const settingText = state.countries.find(
        (countries) => countries.id === Number(action.payload.countryId)
      );
      settingText.text = action.payload.text;
      const newText = state.keepText.filter(
        (country) => country.id !== action.payload.countryId
      );
      return {
        ...state,
        keepText: [...newText, settingText],
      };
    case "fetch/isLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "delete/country":
      return {
        ...state,
        countries: state.countries.filter(
          (country) => country.id !== action.payload
        ),
      };
    case "delete/favourite":
      return {
        ...state,
        favourite: state.favourite.filter(
          (country) => country.id !== action.payload
        ),
      };
    // case "fetch/error":
    //   return {
    //     ...state,
    //     error: action.payload,
    //     isLoading: false,
    //   };
    default:
      return state;
  }
}

export function countries() {
  return async function (dispatch, getState) {
    // dispatch({ type: "fetch/isLoading" });
    try {
      const data = cities.map(async (el) => {
        // const res = await axios.get(url, {
        //   params: {
        //     query: el,
        //     access_key: "11a3ce213d31cff6a6f53cf5f91b1714",
        //     // units: "metric",
        //   },
        // });
        const res = await axios(
          `${WEATHER_API_URL}/weather?lat=${el.lat}&lon=${el.lon}&appid=${weather_key}&units=metric`
        );

        return res.data;
      });

      const result = await Promise.all(data);
      // console.log("this is the result", result);
      dispatch({ type: "fetch/countries", payload: result });
      localStorage.setItem("countriess", JSON.stringify(result));
    } catch (error) {
      console.log(error);
      // dispatch({ type: "fetch/error", payload: error.message });
    }
  };
}
export function singleCountry(lat, lon) {
  return async function (dispatch, getState) {
    try {
      const res = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`
      );
      let data = await res.json();
      dispatch({ type: "fetch/country", payload: data });
      const storedArray = JSON.parse(localStorage.getItem("countriess"));
      storedArray.push(data);
      localStorage.setItem("countriess", JSON.stringify(storedArray));
    } catch (error) {
      if (error) {
        console.log(error.message);
        // dispatch({ type: "fetch/error", payload: error.message });
      }
    }
  };
}

export function addToFavourite(countryId) {
  return {
    type: "add/favourite",
    payload: countryId,
  };
}

export function deleteCountry(countryId) {
  return {
    type: "delete/country",
    payload: countryId,
  };
}
export function deleteFavourite(countryId) {
  return {
    type: "delete/favourite",
    payload: countryId,
  };
}

export function setText(countryId, text) {
  return {
    type: "add/text",
    payload: { countryId, text },
  };
}
