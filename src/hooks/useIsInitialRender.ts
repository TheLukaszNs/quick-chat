import { useEffect, useRef } from "react";

export const useIsInitialRender = () => {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
};
