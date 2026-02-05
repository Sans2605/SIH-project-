"use client";

import { createContext, useEffect, useState, useRef } from "react";

export const UtilityContext = createContext();

export const UtilityProvider = ({ children }) => {
  /*=======[CHAT SCROLL LOGIC]=======*/

  const [ref, setRef] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    setRef(scrollRef);
  }, [scrollRef]);

  const scrollToBottom = () => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  /*=======[ADD FRIEND LOGIC]=======*/

  /*=======[VALUE OBJECT]=======*/

  const values = {
    scrollRef,
    scrollToBottom,
  };

  return (
    <UtilityContext.Provider value={values}>{children}</UtilityContext.Provider>
  );
};
