"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff, Image } from "lucide-react";
import { AuthsContext } from "@/context/AuthsContext";
import { useRouter } from "next/navigation";

/*=====[FIREBASE IMPORTS]=====*/
import { toast } from "sonner";
import { account } from "@/lib/appwrite/config";

export default function Login() {
  const router = useRouter();
  const { currentUser, login } = useContext(AuthsContext);

  useEffect(() => {
    if (currentUser && Object?.keys(currentUser).length > 0) {
      router.push("/home");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*========[NOTFICATION SYSTEM]========*/
  const errNotification = (err) => toast.error(err);

  /*=====[USESTATE HOOKS & UTILITIES]=====*/
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const changeEyeIcon = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  /*=====[AUTHENTICATION SYSTEM]=====*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    /*=====[ NEW USER CREATION ]=====*/
    try {
      await login(email, password);
      setLoading(false);
      router.replace("/home");
      /*=====[ ERROR HANDLING ]=====*/
    } catch (err) {
      console.log(JSON.stringify(err), err);

      errNotification("Something went wrong. Please try again.");

      setLoading(false);
    }
  };

  return (
    <Card className="w-full h-full p-8 md:w-[420px] dark:bg-zinc-900">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0 ">
        <form className="space-y-2.5">
          <Input
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <div className="inline-flex w-full">
            <Input
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-r-none border-r-[1px] border-r-zinc-700"
              type={showPassword ? "text" : "password"}
              required
            />
            <Button
              variant="secondary"
              className="rounded-l-none"
              disabled={loading}
              onClick={(e) => changeEyeIcon(e)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          <Button
            onClick={(e) => handleSubmit(e)}
            className="w-full"
            size="lg"
            disabled={loading}
          >
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col justify-between gap-y-2.5">
          <Button
            disabled={loading}
            variant="outline"
            className="w-full relative flex items-center"
            size={"lg"}
            onClick={() => {}}
          >
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>
        </div>
        <p className="text-sm text-muted-foreground font-medium">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-sky-500 hover:underline cursor-pointer"
          >
            Register Now
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
