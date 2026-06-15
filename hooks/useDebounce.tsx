"use client";

import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(debounceHandler);
  }, [value, delay]);

  return debouncedValue;
}
