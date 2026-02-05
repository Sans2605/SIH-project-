"use client";

import { ChatsContext } from "@/context/ChatsContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import TextBox from "./textbox";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { cn } from "@/lib/utils";
import { UtilityContext } from "@/context/UtilityContext";
import { ArrowLeft } from "lucide-react";
import useViewport from "@/hooks/useViewport";
import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { Query } from "appwrite";

/*==========[CHAT SCREEN]========== */

const ChatScreen = ({ onClick }) => {
  const { data, dispatch } = useContext(ChatsContext);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(null);

  const { ref, width } = useResizeObserver();
  const { breakpoint } = useViewport();
  const { scrollRef, scrollToBottom } = useContext(UtilityContext);

  if (isChatOpen) scrollToBottom();

  useEffect(() => {
    if (Object.keys(data.user).length === 0) {
      setIsChatOpen(false);
    } else {
      setIsChatOpen(true);
    }
  }, [data]);

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const handleClose = () => {
    if (breakpoint == "lg" || breakpoint == "xl" || breakpoint == "2xl") {
      dispatch({ type: "CHANGE_USER", payload: {} });
    } else {
      onClick();
    }
  };

  // FETCH CHATS FROM DATABASE OF CURRENT SELECTED CONVERSATION
  const fetchMessages = async () => {
    try {
      const messages = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userChatsCollectionId, [
        Query.equal("chatId", data.chatId),
      ]);

      console.log(messages.documents[0].chats);
      setMessages(messages.documents[0].chats);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    scrollToBottom();
    fetchMessages();

    return () => {
      console.log(messages);
    };
  }, [data.chatId]);

  return (
    <div ref={ref} className="md:ml-[350px] relative w-full h-full flex flex-col overflow-y-hidden">
      {!isChatOpen ? (
        <div className="h-full w-full flex items-center justify-center"></div>
      ) : (
        <>
          <div
            className="self-start w-full fixed top-0 py-3 overflow-y-hidden inline-flex gap-5 items-center justify-between bg-zinc-200 dark:bg-zinc-800 px-5"
            style={{ width: `${width}px` }}
          >
            <div className="inline-flex items-center gap-5">
              <Image className="rounded-full bg-white" src={data?.user?.imageUrl} alt="Chats" width={45} height={45} />
              <h2 className="text-lg font-semibold">{data?.user?.name}</h2>
            </div>
            <div
              className="p-2 cursor-pointer bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-600 transition-all rounded-full inline-flex items-center justify-center"
              onClick={() => handleClose()}
            >
              <ArrowLeft />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 px-5 w-full h-full mt-[96px] mb-20">
            {messages?.map((message, index) => (
              <ChatBubble key={index} isRecieved={message.senderId === data.user.userId} message={message.text} />
            ))}
            <div className="h-1" ref={scrollRef} />
          </div>

          <div className="fixed bottom-0 mt-1 bg-zinc-100 dark:bg-[#0D0D0D] pt-3" style={{ width: `${width}px` }}>
            <TextBox />
          </div>
        </>
      )}
    </div>
  );
};

const ChatBubble = ({ message, isRecieved }) => {
  console.log(message, isRecieved);
  const recieved = "bg-zinc-200 text-semibold dark:bg-zinc-800 self-start rounded-r-xl rounded-bl-xl";
  const user = "self-end text-white bg-gradient-to-r from-blue-700 to-indigo-700 rounded-l-xl rounded-br-xl";

  return <div className={cn(isRecieved ? recieved : user, "p-3")}>{message}</div>;
};

export default ChatScreen;
