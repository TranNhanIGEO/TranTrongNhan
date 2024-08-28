import { useState } from 'react';

const useFormAutoComplete = () => {
  const [isOpenList, setOpenList] = useState<boolean>(false);
  const [suggestedValue, setSuggestedValue] = useState<string>("");

  const handleFocus = () => {
    setOpenList(true);
  };

  const handleBlur = () => {
    setTimeout(() => setOpenList(false), 100)
  };

  const handleClick = (value: string) => {
    setOpenList(false);
    setSuggestedValue(value);
  };

  return {
    isOpenList,
    suggestedValue,
    handleFocus,
    handleBlur,
    handleClick,
  };
};

export default useFormAutoComplete;
