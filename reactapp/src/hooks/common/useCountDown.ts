import { useState, useEffect } from 'react';

const useCountdown = (initCountdown: number = 30) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(initCountdown);
  let timer: NodeJS.Timeout;

  function startCountdown() {
    setDisabled(true);
    setCountdown(initCountdown);
  }

  function resetCountdown() {
    clearInterval(timer);
    setDisabled(false);
  }

  useEffect(() => {
    if (!disabled) return;

    timer = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount === 1) resetCountdown();
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [disabled]);

  return { disabled, countdown, startCountdown };
};

export default useCountdown;
