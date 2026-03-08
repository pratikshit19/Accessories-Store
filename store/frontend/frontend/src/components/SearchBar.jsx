import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi"; // optional icon

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded shadow-sm overflow-hidden w-64 md:w-80">
      {/* Input */}
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 px-4 focus:outline-none"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Button */}
      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition flex items-center justify-center"
      >
        <BiSearch className="text-lg" />
      </button>
    </div>
  );
}