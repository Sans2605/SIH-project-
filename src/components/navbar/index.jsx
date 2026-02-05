"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";

const Navbar = ({ hasWhiteBgs }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <nav
        className={`fixed w-full max-w-[100vw] top-0 z-50 ${open ? "bg-primary" : "bg-transparent backdrop-blur-[32px]"}
        ${hasWhiteBgs && theme === "light" ? "border-b border-zinc-300" : ""}
        px-2.5 py-2.5`}
      >
        <div className="h-auto w-full lg:mx-auto max-w-screen-xl flex justify-between items-center">
          <h1
            className={`${
              hasWhiteBgs && theme === "light" ? "text-black" : "text-white"
            } text-xl font-heading leading-0 mt-[-0.45rem] cursor-pointer`}
            onClick={() => router.push("/")}
          >
            Alumni Connects
          </h1>
          <div className="gap-4 hidden md:flex items-center">
            <Button className={`${hasWhiteBgs && theme === "light" ? "text-black" : "text-white"} bg-transparent`} variant={"secondary"}>
              <Link href="/about">About</Link>
            </Button>
            <Button className={`${hasWhiteBgs && theme === "light" ? "text-black" : "text-white"} bg-transparent`} variant={"secondary"}>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button className="text-white" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="text-white" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Button className={`${open ? "bg-white text-primary" : ""} font-semibold `} size={"lg"} variant={"default"} asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
            <Button onClick={() => setOpen(!open)} className="p-2" variant={"secondary"}>
              <Menu />
            </Button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all absolute w-full ${open ? "left-0" : "left-[-100%]"} ${
            open ? "w-full" : "w-0"
          } duration-300 top-0 mt-[64px] flex h-screen flex-col items-start text-left bg-primary text-white gap-2 px-2`}
        >
          <div onClick={() => setOpen(false)} className="w-full text-2xl hover:text-blue-400 transition-all font-heading py-2 self-start text-left">
            {"; Student Corner"}
          </div>
          <div onClick={() => setOpen(false)} className="w-full text-2xl hover:text-blue-400 transition-all font-heading py-2 self-start text-left">
            {"; Job Portal"}
          </div>
          <div onClick={() => setOpen(false)} className="w-full text-2xl hover:text-blue-400 transition-all font-heading py-2 self-start text-left">
            {"; Connect with Alumnis"}
          </div>
          <div onClick={() => setOpen(false)} className="w-full text-2xl hover:text-blue-400 transition-all font-heading py-2 self-start text-left">
            {"; About Us"}
          </div>
          <div onClick={() => setOpen(false)} className="w-full text-2xl hover:text-blue-400 transition-all font-heading py-2 self-start text-left">
            {"; Contact Us"}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
