/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useRef, useEffect } from "react";

export const useResizeObserver = () => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  }, []);

  return {
    width,
    ref,
  };
};
