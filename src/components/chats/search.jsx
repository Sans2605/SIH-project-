"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleAlert, UserRoundPlus } from "lucide-react";
import { Input } from "../ui/input";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { ID, Query } from "appwrite";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { AuthsContext } from "@/context/AuthsContext";
import { ChatsContext } from "@/context/ChatsContext";
import { nanoid } from "nanoid";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const { currentUser: currentUserData, updateContext } =
    useContext(AuthsContext);
  const { dispatch } = useContext(ChatsContext);

  useEffect(() => {
    setCurrentUser(currentUserData);
  }, [currentUserData]);

  useEffect(() => {
    if (searchQuery) {
      setDisabled(false);
    } else {
      setDisabled(true);
      setUser(null);
    }
  }, [searchQuery]);

  /*===========[SEARCH USERS]===========*/
  const handleSearch = async (e) => {
    e.preventDefault();

    setUser(null);
    setDisabled(true);
    setLoading(true);

    const a = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.contains("username", searchQuery)]
    );

    setUser(a.documents);

    setDisabled(false);
    setLoading(false);
  };

  /*===========[CLEAR SEARCH]===========*/
  const clearSearch = () => {
    setSearchQuery("");
    setUser(null);
  };

  /*===========[CREATE CONVERSATIONS]===========*/
  const handleCreateChats = async (e, userData) => {
    e.preventDefault();

    try {
      setChatLoading(true);
      toast.info("Creating a new conversation");

      if (!currentUser?.data?.isAlumni) {
        toast.error("Only Alumni can create a new conversation");
        throw new Error("Only Alumni can create a new conversation");
      }

      const combinedId =
        userData.$id > currentUser.$id
          ? userData.$id + currentUser.$id
          : currentUser.$id + userData.$id;

      const currentTime = new Date().toISOString();

      // Check if the conversation already exists
      const existingConversation = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userChatsCollectionId,
        [Query.equal("chatId", combinedId)]
      );

      if (existingConversation.documents.length > 0) {
        toast.error("Conversation already exists");
        throw new Error("Conversation already exists");
      }

      // For the logged in user
      const updatedUserChats = [...currentUser.data.userChats];

      // Generate a unique ID for the conversation
      const conversationId = nanoid(16);

      updatedUserChats.push({
        userId: userData.$id,
        username: userData.username,
        imageUrl: userData.imageUrl,
        name: userData.name,
        chatId: conversationId,
        timestamp: currentTime,
      });

      // For the logged in user
      const updatedUserChats2 = [...userData.userChats];

      updatedUserChats2.push({
        userId: currentUser.$id,
        username: currentUser.data.username,
        imageUrl: currentUser.data.imageUrl,
        name: currentUser.data.name,
        chatId: conversationId,
        timestamp: currentTime,
      });

      // Set the updated userChats array in logged in user
      // Set the updated userChats array in searched user
      // Run both updateDocument calls in parallel
      const [res, res2] = await Promise.all([
        databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          currentUser.$id,
          {
            userChats: updatedUserChats,
          }
        ),
        databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          userData.$id,
          {
            userChats: updatedUserChats2,
          }
        ),
      ]);

      // Update the context for the logged in user
      await updateContext();
      dispatch({ type: "CHANGE_USER", payload: userData });

      console.log(res2);

      toast.success("Conversation created successfully");
    } catch (error) {
      console.log(JSON.stringify(error), error);
    } finally {
      clearSearch();
      setChatLoading(false);
      setUser(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger onClick={clearSearch}>
        <div className="p-2 inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-all border-2 border-gray-300 dark:border-zinc-700 cursor-pointer">
          <UserRoundPlus className="searchQuery-gray-500 dark:searchQuery-white size-5" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search for users</DialogTitle>
          <DialogDescription>
            <p className="pb-5">
              Search for users by their userId to start conversation
            </p>
            <form
              onSubmit={(e) => handleSearch(e)}
              className="flex items-center gap-5 w-full"
            >
              <Input
                name="searchQuery"
                id="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                className="h-[51px] border-2 rounded-xl border-gray-200 font-normal dark:border-zinc-800 text-foreground bg-gray-200 dark:bg-zinc-900 dark:searchQuery-white p-3 md:text-md"
                placeholder="Search with username"
              />
              <Button
                disabled={disabled}
                type="submit"
                className="h-[51px] bg-blue-700 border-2 border-blue-600 rounded-xl"
              >
                Search
              </Button>
            </form>
            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-5 items-center w-full bg-zinc-900 p-3 rounded-xl h-[72px] mt-5"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="w-32 h-[25px]" />
                      <Skeleton className="w-28 h-[20px]" />
                    </div>
                  </div>
                </div>
              ))}
            {user &&
              user.slice(0, 3).map((user) => (
                <div
                  key={user.$id}
                  className={`flex items-center justify-between gap-5 w-full bg-zinc-900 p-3 rounded-xl mt-5  ${
                    chatLoading
                      ? "noselect cursor-progress border-[0] opacity-25"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      className="rounded-full bg-black"
                      src={user?.imageUrl}
                      alt={user?.name}
                      width={48}
                      height={48}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {user?.name}
                      </h3>
                      <p>@{user?.username}</p>
                    </div>
                  </div>
                  <div
                    onClick={(e) => handleCreateChats(e, user)}
                    className="font-semibold p-3 bg-zinc-800 border-2 text-foreground border-zinc-700 hover:bg-zinc-700 transition-all rounded-xl cursor-pointer"
                  >
                    Click to chat
                  </div>
                </div>
              ))}

            {user && user.length === 0 && (
              <div className="text-foreground inline-flex w-full items-center gap-2 font-semibold p-3 mt-5 bg-zinc-900 border-2 border-zinc-800 hover:bg-zinc-800 transition-all rounded-xl cursor-pointer">
                <CircleAlert /> No user found
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
