"use client";

import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { AuthsContext } from "@/context/AuthsContext";
import SideBarProfile from "./sidebar-profile";
import Link from "next/link";
import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { Query } from "appwrite";

const Jobs = () => {
  const { currentUser } = useContext(AuthsContext);
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.jobCollectionId,
          [Query.limit(25)]
        );

        setJobsData(data.documents);
        console.log(data.documents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <section className="h-full relative p-4 pt-8 lg:px-8 flex flex-col lg:flex-row bg-zinc-100 dark:bg-[#0D0D0D] items-start gap-5 w-full">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Recommended Jobs</h1>
        <div className="flex gap-5 mt-5 flex-col lg:flex-row flex-wrap">
          {jobsData &&
            jobsData.map((job) => {
              return <Card key={job.$id} data={job} />;
            })}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {currentUser?.data?.isAlumni && (
          <Link
            href="/jobs/create"
            className="flex items-center justify-center bg-zinc-800 border-dashed border-[2.5px] border-zinc-700 rounded-xl font-bold text-zinc-300 hover:bg-zinc-900 transition-all h-16 cursor-pointer "
          >
            Create new jobs
          </Link>
        )}
        <SideBarProfile user={currentUser} />
      </div>
    </section>
  );
};

export default Jobs;

const Card = ({ data }) => {
  return (
    <div className="relative flex h-auto md:w-[275px] cursor-pointer hover:brightness-75 flex-col rounded-md md:rounded-xl dark:border-2 dark:border-zinc-800  md:dark:bg-zinc-900 p-5 md:duration-300 md:dark:hover:bg-zinc-800 md:hover:bg-zinc-200 md:hover:brightness-100 transition-all shadow__card">
      <div className="flex w-full flex-wrap items-baseline justify-between">
        <p className="mb-3 self-start px-3 py-1 bg-black/5 text-zinc-500 dark:bg-white/5 rounded-lg whitespace-nowrap text-xs font-semibold dark:text-zinc-400 md:text-sm">
          15th Dec, 2024
        </p>
        <img
          className="h-12 rounded-xl bg-black/5 dark:bg-zinc-800 border-2 p-1.5"
          src={data.company_logo}
          alt={data.description}
        />
      </div>

      <div className="flex h-full w-full flex-col items-start justify-between">
        <div className="mb-3 flex w-full flex-col">
          <h5 className="line-clamp-2 md:mb-0 mb-1 text-sm font-bold text-zinc-400 leading-5 md:leading-normal">
            By: {data?.creator}
          </h5>
          <h5 className="line-clamp-2 md:mb-0 mb-1 text-sm font-bold text-zinc-400 leading-5 md:leading-normal">
            Company: {data?.company_name}
          </h5>
          <h3 className="line-clamp-2 md:mb-0 mb-5 text-lg font-bold leading-5 md:leading-normal">
            {data.description}
          </h3>
        </div>
        <div className="overflow-none relative flex w-full flex-wrap items-baseline gap-3">
          {data.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-black/5 text-zinc-500 dark:bg-white/5 rounded-lg whitespace-nowrap text-xs uppercase font-semibold dark:text-zinc-400 md:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button className="mt-5 w-full" asChild>
          <Link href={data.link ? data.link : "/chats"}>Apply</Link>
        </Button>
      </div>
    </div>
  );
};
