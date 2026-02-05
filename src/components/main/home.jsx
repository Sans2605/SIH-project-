"use client";

import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthsContext } from "@/context/AuthsContext";
import SideBarProfile from "./sidebar-profile";
import { client } from "@/lib/sanity/client";
import urlFor from "@/lib/sanity/imageUrl";

const Home = () => {
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
        <h1 className="text-2xl font-bold">Welcome {currentUser?.data?.name}, to Alumni Connects</h1>
        <HomeCTABox />
        <h1 className="text-2xl font-bold">News and Events</h1>
        <div className="flex gap-5 mt-5 flex-col lg:flex-row">
          {communityData.length > 3 &&
            communityData
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((data) => data.type === "Success Story" && <Card key={data._id} data={data} />)}
        </div>

        <h1 className="text-2xl mt-5 font-bold">Success Stories</h1>
        <div className="flex gap-5 my-5 flex-col lg:flex-row">
          {communityData && communityData.map((data) => data.type === "Success Story" && <Card key={data._id} data={data} />)}
        </div>
      </div>
      <SideBarProfile user={currentUser} />
    </section>
  );
};

const HomeCTABox = () => {
  return (
    <div className="flex relative flex-col w-full items-start justify-center gap-4 py-5 px-5 md:px-8 bg-primary text-white my-8 rounded-xl">
      <h2 className="text-sm">Sinhgad Carnival 2024</h2>
      <h1 className="text-3xl font-bold">Springfest is hiring now</h1>
    </div>
  );
};

export default Home;

const Card = ({ data }) => {
  const { type, title, description, date, tags, url, image } = data;

  return (
    <a
      href={url}
      className="relative flex h-full md:max-w-[300px] cursor-pointer hover:brightness-75 md:flex-col rounded-md md:rounded-xl dark:border-zinc-800  md:dark:bg-zinc-900 md:p-5 md:duration-300 md:dark:hover:bg-zinc-800 md:hover:bg-zinc-200 md:hover:brightness-100 transition-all shadow__card"
    >
      <div className="relative mr-4 !aspect-video max-h-[72px] min-h-[149px] min-h-[85px] w-full max-w-[128px] md:mb-3 md:min-h-[145px] md:max-w-[257px]">
        <img className="rounded-l-md md:rounded-md" src={image ? urlFor(image).url() : ""} alt="Featured Image" />
      </div>
      <div className="flex h-full w-full py-1.5 flex-col items-start justify-between">
        <div className="mb-3 flex w-full flex-col">
          <h3 className="line-clamp-2  text-base-m font-bold leading-5 md:text-base md:leading-normal">{title}</h3>
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
    </a>
  );
};
