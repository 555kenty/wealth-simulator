"use client";

import { useState, useCallback } from "react";

export function useFormattedNumber(
  initialValue: number = 0
): [
  string,
  (value: string) => void,
  number
] {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("fr-FR").format(num);
  };

  const parseNumber = (str: string): number => {
    return parseInt(str.replace(/\s/g, "").replace(/[^\d-]/g, ""), 10) || 0;
  };

  const [displayValue, setDisplayValue] = useState(formatNumber(initialValue));
  const [numericValue, setNumericValue] = useState(initialValue);

  const handleChange = useCallback((value: string) => {
    const numeric = parseNumber(value);
    setNumericValue(numeric);
    setDisplayValue(formatNumber(numeric));
  }, []);

  return [displayValue, handleChange, numericValue];
}

export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setPersistedState = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
      return newValue;
    });
  }, [key]);

  return [state, setPersistedState];
}
