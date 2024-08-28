import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handleDebounce = async () => {
      setDebouncedValue(value);
    };

    const timeout = setTimeout(handleDebounce, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
