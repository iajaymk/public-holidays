import { useQuery } from "@tanstack/react-query";
import type { Country, CountryApiResponse } from "./types/countries";
import { useMemo } from "react";

function App() {
  const days = [
    { date: "2 Oct", special: "Gandhi Jayanthi" },
    { date: "15 Aug", special: "Independence Day" },
  ];

  const { data, isPending, isError, error } = useQuery<CountryApiResponse[]>({
    queryKey: ["countryData", "en"],
    queryFn: async () => {
      const response = await fetch(
        "https://openholidaysapi.org/Countries/?languageIsoCode=en"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  const countries: Country[] = useMemo(() => {
    if (!data) return [];

    return data.map((country) => ({
      code: country.isoCode,
      name: country.name[0]?.text ?? country.isoCode,
    }));
  }, [data]);

  if (isPending) {
    return <p>Loading country data...</p>;
  }

  if (isError) {
    return <p>An error has occurred: {error.message}</p>;
  }

  return (
    <div className="paper container container-md margin-top-large">
      <h1 className="text-center">Public Holidays App</h1>

      <div className="form-group margin-bottom-large">
        <label htmlFor="countrySelect">Select Country</label>
        <select id="countrySelect">
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {days.map((day, index) => (
          <li className="margin-bottom-small" key={index}>
            {day.date} {day.special}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
