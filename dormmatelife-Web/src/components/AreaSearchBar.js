import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const dummyAreas = [
  "Gulshan-e-Iqbal",
  "DHA Phase 5",
  "North Nazimabad",
  "Clifton Block 7",
  "PECHS Block 2",
  "University Road",
  "Bahadurabad",
  "Korangi",
  "Malir Cantt",
  "Shah Faisal Colony",
];

const AreaSearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (input === "") {
      // Show 5 random areas
      const shuffled = [...dummyAreas].sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 5));
    } else {
      // Filter suggestions by input
      const filtered = dummyAreas.filter((area) =>
        area.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [input]);

  const handleSelect = (area) => {
    setInput(area);
    setSelectedArea(area);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!selectedArea) return alert("Please select an area");
    navigate(`/search-results?area=${selectedArea}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        className="w-full p-3 border rounded-md"
        placeholder="Enter area or location..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setSuggestions(dummyAreas.slice(0, 5))}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
          {suggestions.map((area, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(area)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {area}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleSearch}
        className="absolute right-3 top-3 text-gray-600 hover:text-black"
      >
        🔍
      </button>
    </div>
  );
};

export default AreaSearchBar;
