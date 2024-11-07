import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;

//When value changes, it sets up a setTimeout with the specified delay. After the delay, setDebounceValue(value) is called, updating debounceValue with the latest value.
//If the value changes again before the delay finishes, the useEffect cleanup function cancels the previous timer (using clearTimeout), restarting the delay countdown.
//This means debounceValue only updates after value has stayed the same for the specified delay period.
