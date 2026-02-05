"use client";

import { AuthsContext } from "@/context/AuthsContext";
import { ChatsContext } from "@/context/ChatsContext";
import Image from "next/image";
import { useContext } from "react";

/*==========[CHATS LISTS]========== */

const Chats = ({ onClick = () => {} }) => {
  const { currentUser } = useContext(AuthsContext);
  const { dispatch } = useContext(ChatsContext);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    onClick();
  };

  console.log(currentUser?.data?.userChats);

  return (
    <div className="w-full flex flex-col gap-2 divide-y-2">
      {currentUser?.data?.userChats.length > 0 ? (
        currentUser?.data?.userChats.map((data, index) => (
          <Chat
            key={index}
            lastMessage={
              data?.userChats?.lastMessage || "Hello, this is a message."
            }
            imageUrl={data?.imageUrl}
            name={data?.name}
            onClick={() => handleSelect(data)}
          />
        ))
      ) : (
        <p className="text-md text-neutral-600 dark:text-neutral-300">
          No chats here, start a conversation
        </p>
      )}
    </div>
  );
};

/*==========[CHAT ITEM]========== */
const Chat = ({ lastMessage, imageUrl, onClick, name }) => {
  return (
    <div
      onClick={() => onClick()}
      className="w-full p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 flex items-center cursor-pointer gap-2.5"
    >
      <Image
        className="rounded-full object-cover"
        src={imageUrl}
        alt="Chats"
        width={51}
        height={51}
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-md text-neutral-600 dark:text-neutral-300">
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default Chats;
