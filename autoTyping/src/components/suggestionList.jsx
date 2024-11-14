import React from "react";

const SuggestionList = ({
  suggestions,
  highlight,
  datakey,
  onSuggestionClick,
}) => {
  const getHighLightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log(parts);
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };
  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = datakey ? suggestion[datakey] : suggestion;
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion__item"
          >
            {getHighLightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
