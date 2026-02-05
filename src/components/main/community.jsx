"use client";

import { Button } from "../ui/button";
import SideBarProfile from "./sidebar-profile";

import { useContext, useEffect, useState } from "react";
import { AuthsContext } from "@/context/AuthsContext";
import { client } from "@/lib/sanity/client";
import urlFor from "@/lib/sanity/imageUrl";
import Link from "next/link";
const Community = () => {
  const { currentUser } = useContext(AuthsContext);
  const [communityData, setCommunityData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "community"]{
              type, title, description, date, tags, image, url
            }`
        );
        setCommunityData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [currentUser]);

  return (
    <section className="h-full p-4 pt-8 lg:px-8 flex flex-col lg:flex-row bg-zinc-100 dark:bg-[#0D0D0D] items-start gap-5 w-full">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Mentorship Programs:</h1>
        <div className="flex gap-5 mt-5 flex-col lg:flex-row">
          {communityData &&
            communityData.map(
              (data) =>
                data.type.toLowerCase() === "mentorship" && (
                  <Card key={data._id} data={data} />
                )
            )}
        </div>
        <h1 className="text-2xl mt-5 font-bold">Events & Workshops</h1>
        <div className="flex gap-5 mt-5 flex-col lg:flex-row">
          {communityData &&
            communityData.map(
              (data) =>
                data.type.toLowerCase() === "event & workshop" && (
                  <Card key={data._id} data={data} />
                )
            )}
        </div>
        <h1 className="text-2xl mt-5 font-bold">Success Stories</h1>
        <div className="flex gap-5 my-5 flex-col lg:flex-row">
          {communityData &&
            communityData.map(
              (data) =>
                data.type === "Success Story" && (
                  <SuccessStoriesCard key={data._id} data={data} />
                )
            )}
        </div>
      </div>
      <SideBarProfile user={currentUser} />
    </section>
  );
};

export default Community;

const Card = ({ data }) => {
  const { type, title, description, date, tags, url, image } = data;
  console.log(data.type);

  return (
    <div className="relative flex h-full md:w-[275px] cursor-pointer hover:brightness-75 flex-col rounded-md md:rounded-xl dark:border-2 dark:border-zinc-800  md:dark:bg-zinc-900 p-5 md:duration-300 md:dark:hover:bg-zinc-800 md:hover:bg-zinc-200 md:hover:brightness-100 transition-all shadow__card">
      <div className="flex w-full flex-wrap items-baseline justify-between">
        <p className="mb-3 self-start px-3 py-1 bg-black/5 text-zinc-500 dark:bg-white/5 rounded-lg whitespace-nowrap text-xs font-semibold dark:text-zinc-400 md:text-sm">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {image && (
          <img
            className="h-12 rounded-xl bg-black/5 dark:bg-zinc-800 border-2 p-1.5"
            src={image ? urlFor(image).url() : ""}
            alt={title}
          />
        )}
      </div>

      <div className="flex h-full w-full flex-col items-start justify-between">
        <div className="mb-3 flex w-full flex-col">
          <h5 className="line-clamp-2 md:mb-0 mb-1 text-sm font-medium text-zinc-400 leading-5 md:leading-normal">
            {type}
          </h5>
          <h3 className="line-clamp-2 md:mb-0 mb-5 text-lg font-bold leading-5 md:leading-normal">
            {title}
          </h3>
        </div>
        <div className="overflow-none relative flex w-full flex-wrap items-baseline gap-3">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-black/5 text-zinc-500 dark:bg-white/5 rounded-lg whitespace-nowrap text-xs uppercase font-semibold dark:text-zinc-400 md:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button asChild className="mt-5 w-full">
          <Link href={url}>Apply</Link>
        </Button>
      </div>
    </div>
  );
};

const SuccessStoriesCard = ({ data }) => {
  const { type, title, description, date, tags, url, image } = data;

  return (
    <div className="relative flex h-full md:max-w-[300px] cursor-pointer hover:brightness-75 md:flex-col rounded-md md:rounded-xl dark:border-zinc-800  md:dark:bg-zinc-900 md:p-5 md:duration-300 md:dark:hover:bg-zinc-800 md:hover:bg-zinc-200 md:hover:brightness-100 transition-all shadow__card">
      <div className="relative mr-4 !aspect-video max-h-[72px] min-h-[149px] min-h-[85px] w-full max-w-[128px] md:mb-3 md:min-h-[145px] md:max-w-[257px]">
        <img
          className="rounded-l-md md:rounded-md"
          src={urlFor(image).url()}
          alt="Featured Image"
        />
      </div>
      <div className="flex h-full w-full py-1.5 flex-col items-start justify-between">
        <div className="mb-3 flex w-full flex-col">
          <h3 className="line-clamp-2  text-base-m font-bold leading-5 md:text-base md:leading-normal">
            {title}
          </h3>
        </div>
        <div className="overflow-none relative flex w-full flex-wrap items-baseline justify-between gap-1">
          <p className="mb-1 whitespace-nowrap text-xs font-semibold text-zinc-400 md:text-sm">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
