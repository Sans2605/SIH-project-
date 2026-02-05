import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ShieldCheck } from "lucide-react";

const SideBarProfile = ({ user }) => {
  return (
    <div className="max-w-[555px] hidden mt-5 md:mt-0 md:flex flex-col items-center border-[1px] dark:border-zinc-800 dark:bg-zinc-900 bg-zinc-100 p-4 rounded-xl gap-5">
      <div className="flex flex-col items-center w-full gap-2">
        <span className="w-full h-24 bg-primary rounded-xl" />
        <Image
          className="rounded-full bg-black border-[7px] border-zinc-900 mt-[-3.5rem]"
          src={user?.data?.imageUrl}
          alt={user?.data?.name}
          width={82}
          height={82}
        />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <h1 className="text-2xl font-bold">{user?.data?.name}</h1>
            {user?.data?.isAlumni ? (
              <ShieldCheck className="size-5 text-green-500" />
            ) : user?.data?.isAdmin ? (
              <ShieldCheck className="size-5 text-pink-500" />
            ) : (
              <ShieldCheck className="size-5 text-blue-500" />
            )}
          </div>
          <p className="text-sm text-zinc-400">@{user?.data?.username}</p>
        </div>
        <Separator className="w-[75%] my-2 bg-zinc-800" />
        <p className="text-sm max-w-[75%] text-center text-zinc-400">
          {user?.data?.bio ||
            "Sustainability consultant passionate about eco-innovation. 🌿"}
        </p>
        <Separator className="w-[75%] my-2 bg-zinc-800" />
        <Button className="w-full">Profile</Button>
        <Button className="w-full dark:bg-white/5 bg-black/15 dark:text-white text-dark font-semibold hover:bg-white/15">
          Chats
        </Button>
      </div>
    </div>
  );
};

export default SideBarProfile;
