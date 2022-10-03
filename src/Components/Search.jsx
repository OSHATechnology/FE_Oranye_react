import { Icon } from "@iconify/react";
import React from "react";
import ButtonSmall from "./ButtonSmall";

const Search = ({onChange}) => {
  return (
    <div className="">
      <input
        type="text"
        className="border border-slate-400 rounded text-gray-800 bg-gray-100 h-9 w-64 text-center text-sm font-semibold"
        placeholder="Search ..."
        onChange={onChange}
      />
     
    </div>
  );
};

export default Search;
