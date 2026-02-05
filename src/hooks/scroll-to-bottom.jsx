import { useState, useRef, useEffect } from "react";

export const useScrollToBottom = () => {
  const [ref, setRef] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    setRef(scrollRef);
  }, [scrollRef]);

  const scrollToBottom = () => {
    ref?.current?.scrollIntoView();
  };

  return {
    scrollRef,
    scrollToBottom,
  };
};
