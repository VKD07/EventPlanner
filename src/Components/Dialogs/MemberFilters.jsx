import { useEffect, useState } from "react";

const MemberFilters = ({ categoryName, filterOptions, selectedFilters }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    selectedFilters(selectedValues);
  }, [selectedValues]);

  function handleChecked(filterName) {
    setSelectedValues((prev) =>
      prev.includes(filterName)
        ? prev.filter((filter) => filter !== filterName)
        : [...prev, filterName]
    );
  }

  return (
    <div className="bg-amber-400 rounded p-2">
      <span className="font-bold">{categoryName}: </span>
      <div className="border-1 my-1" />
      <div className="grid grid-cols-2">
        {filterOptions.map((filter, index) => (
          <div key={index} className="flex flex-row flex-wrap gap-1">
            <input
              type="checkbox"
              checked={selectedValues.includes(filter.name)}
              onChange={() => handleChecked(filter.name)}
            />
            <label>{filter.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberFilters;