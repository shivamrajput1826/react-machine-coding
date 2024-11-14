import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import "./styles.css";
import SuggestionList from "./suggestionList";

const AutoComplete = ({
  placeHolder,
  staticData,
  fetchSuggestions,
  dataKey,
  customLoading,
  onSelect,
  onChange,
  onBlur,
  onFocus,
  customStyles,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    onChange(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData)
        result = staticData.filter((data) => {
          return data.toLowerCase().includes(query.toLowerCase());
        });
      else {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (error) {
      setError(error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getDebounceSuggestion = useDebounce(getSuggestions);

  useEffect(() => {
    if (inputValue.length > 1) {
      getDebounceSuggestion(inputValue);
    } else {
      setSuggestions([]);
    }
    console.log(suggestions);
  }, [inputValue]);

  return (
    <div className="container">
      <input
        type="text"
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        value={inputValue}
        placeholder={placeHolder}
        onChange={handleInputChange}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestion__list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionList
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            datakey={dataKey}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
