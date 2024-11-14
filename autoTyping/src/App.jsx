import { useEffect, useState } from "react";
import "./App.css";
import AutoComplete from "./components/autoComplete";

function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response is not OK");
    }
    const data = await response.json();
    return data.recipes;
  };

  return (
    <>
      <div>Auto Complete</div>
      <AutoComplete
        placeHolder={"Enter Recipe"}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipes...</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        customStyles={{}}
      />
    </>
  );
}

export default App;
