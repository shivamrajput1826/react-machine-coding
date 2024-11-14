import { useRef } from "react";
export function useDebounce(fn, delay = 1000) {
  let timer = useRef(null);
  return function (...args) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      console.log("debounce working");
      fn(...args);
    }, delay);
  };
}
