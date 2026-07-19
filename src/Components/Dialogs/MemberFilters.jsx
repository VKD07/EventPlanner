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
    <div className="bg-pew rounded-md p-2 border border-brass/15">
      <span className="font-semibold text-parchment text-sm">{categoryName}</span>
      <div className="border-t border-brass/15 my-1.5" />
      <div className="grid grid-cols-2 gap-y-1">
        {filterOptions.map((filter, index) => (
          <div key={index} className="flex flex-row flex-wrap items-center gap-1.5">
            <input
              type="checkbox"
              className="accent-brass"
              checked={selectedValues.includes(filter.name)}
              onChange={() => handleChecked(filter.name)}
            />
            <label className="text-parchment/70 text-xs">{filter.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberFilters;
