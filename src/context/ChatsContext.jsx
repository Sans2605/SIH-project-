"use client";

import { createContext, useReducer, useContext } from "react";
import { AuthsContext } from "@/context/AuthsContext";

export const ChatsContext = createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(AuthsContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: action.payload.chatId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatsContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
};
