"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import SideBarProfile from "./sidebar-profile";
import { useContext } from "react";
import { AuthsContext } from "@/context/AuthsContext";
import Link from "next/link";

const DonationPortal = () => {
  const { currentUser } = useContext(AuthsContext);
  const [donationAmount, setDonationAmount] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className="h-full relative p-4 pt-8 lg:px-8 flex flex-col lg:flex-row bg-zinc-100 dark:bg-[#0D0D0D] items-start gap-5 w-full">
      <div className="w-full flex flex-col items-start justify-center max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Donation Portal</h1>
        <p className="text-center text-xlg text-zinc-600 dark:text-zinc-400 mb-8">
          Your contributions help fund training programs, competitions, and student clubs.
        </p>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          <b className="text-green-600 pr-1">Support Students:</b> Provide scholarships and resources for those in need.
        </p>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          <b className="text-green-600 pr-1">Foster Innovation:</b> Fund clubs, research, and entrepreneurial projects.
        </p>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          <b className="text-green-600 pr-1">Enhance Campus Life:</b> Improve facilities and support vibrant extracurricular programs.
        </p>

        <Link
          className="mt-4 w-full bg-green-600 hover:bg-green-700 py-2 text-center font-bold text-zinc-600 dark:text-white rounded-md"
          href="https://payments-test.cashfree.com/forms/alumni-Connects"
        >
          Donate Now
        </Link>
      </div>

      <div className="shadow__card rounded-xl">
        <SideBarProfile user={currentUser} />
      </div>
    </section>
  );
};

export default DonationPortal;
