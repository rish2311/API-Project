import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, options } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}cities?minPopulation=1000000&namePrefix=${inputValue}`,
        options
      );
      const result = await response.json();

      return {
        options: result.data.map((city) => ({
          label: `${city.name}, ${city.countryCode}`, // What gets displayed
          value: city.id, // Unique identifier for the city
        })),
      };
    } catch (error) {
      console.error("Error fetching cities:", error);
      return {
        options: [],
      };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
