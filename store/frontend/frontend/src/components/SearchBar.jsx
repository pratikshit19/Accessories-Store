import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    }
  };

  return (
    <div className="flex items-center border-b border-white/20 w-full focus-within:border-white/60 transition-colors">
      <FiSearch className="text-text-muted flex-shrink-0" size={16} />
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 bg-transparent text-white px-4 py-2 text-sm focus:outline-none font-light placeholder:text-text-muted/40"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        autoFocus
      />
      <button
        onClick={handleSearch}
        className="text-[10px] tracking-widest uppercase text-text-muted hover:text-white transition-colors px-2 py-1 flex-shrink-0"
      >
        Go
      </button>
    </div>
  );
}