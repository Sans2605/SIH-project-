"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { AuthsContext } from "@/context/AuthsContext";
import { ChatsContext } from "@/context/ChatsContext";
import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { ID, Query } from "appwrite";

const TextBox = () => {
  const { currentUser } = useContext(AuthsContext);
  const { data } = useContext(ChatsContext);

  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (text !== "") {
      setDisabled(false);
    }
    if (text === "") {
      setDisabled(true);
    }
  }, [text]);

  const handleSendMessage = async (e, text) => {
    // UPDATE CHATS, MESSAGES IN DATABASE

    e.preventDefault();

    try {
      setText("");
      const currentTime = new Date().toISOString();

      const conversations = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userChatsCollectionId,
        [Query.equal("chatId", data.chatId)]
      );

      const updatedConversation = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userChatsCollectionId,
        conversations.documents[0].$id,
        {
          lastMessage: text,
          chats: [
            ...conversations.documents[0].chats,
            {
              id: ID.unique(),
              text,
              senderId: currentUser.$id,
              timestamp: currentTime,
              reactions: [],
            },
          ],
        }
      );

      setMessages(updatedConversation.chats);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full px-5 mb-5 my-2 flex items-center gap-5">
      <Input
        name="text"
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete="off"
        className="h-[51px] border-2 rounded-xl font-normal dark:bg-zinc-800 dark:text-white p-3 md:text-md"
        placeholder="Type a message..."
      />
      <Button
        disabled={disabled}
        onClick={(e) => handleSendMessage(e, text)}
        className="h-[51px] bg-blue-700 border-2 border-blue-600 rounded-xl"
      >
        Send
      </Button>
    </div>
  );
};

export default TextBox;
