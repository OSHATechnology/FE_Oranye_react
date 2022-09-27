import React from "react";
import ButtonSmall from "./ButtonSmall";

const Search = () => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        className="border border-gray-300 rounded text-gray-800 bg-gray-100 h-9 w-64 text-center text-sm font-semibold"
        placeholder="Search..."
      />
      <ButtonSmall icon="akar-icons:search" bg="bg-gray-400" />
    </div>
  );
};

export default Search;
