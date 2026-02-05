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
import { Eye, EyeOff } from "lucide-react";
import { AuthsContext } from "@/context/AuthsContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpCard() {
  const router = useRouter();
  const {
    currentUser,
    loading: isLoading,
    register,
  } = useContext(AuthsContext);

  useEffect(() => {
    if (currentUser && !isLoading) {
      router.replace("/getting-started");
    }
  });

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isAlumni, setIsAlumni] = useState(false);
  const [password, setPassword] = useState("");

  /*========[NOTFICATION SYSTEM]========*/
  const errNotification = (err) => toast.error(err);
  const infoNotification = (info) => toast.info(info);

  /*=====[USESTATE HOOKS & UTILITIES]=====*/
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const changeEyeIcon = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  /*=====[AUTHENTICATION SYSTEM]=====*/
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    /*=====[ NEW USER CREATION ]=====*/
    try {
      // Input Validation
      if (!email || !password || !name || !username) {
        throw new Error("All fields are required.");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      await register(email, password, name, isAlumni, username);

      /*=====[ Set loading to false & navigate to home ]=====*/
      setLoading(false);
      infoNotification("Loading app...");
      router.push("/home");

      /*=====[ ERROR HANDLING ]=====*/
    } catch (err) {
      console.log(err);
      errNotification(err.message);
      setLoading(false);
    }
  };

  return (
    <Card className="relative w-full h-full p-8 md:w-[420px] dark:bg-zinc-900">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0 h-auto">
        <form className="space-y-2.5">
          <Input
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display Name"
            type="text"
            required
          />
          <Input
            disabled={loading}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            type="text"
            required
          />

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
          <div className="[background:linear-gradient(45deg,theme(colors.zinc.900),theme(colors.zinc.800)_50%,theme(colors.zinc.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.zinc.600/.48)_80%,_theme(colors.zinc.500)_86%,_theme(colors.zinc.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.blue.600/.48))_border-box] rounded-xl border border-transparent animate-border">
            {" "}
            <div
              className={`relative flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 ${
                loading ? "opacity-50 cursor-not-allowed" : "opcaity-100"
              }`}
            >
              <Checkbox
                checked={isAlumni}
                onCheckedChange={(e) => setIsAlumni(e)}
                required
              />
              <div className="space-y-1 leading-none">
                <Label>Are you an Alumni?</Label>
                <p className="text-sm text-muted-foreground">
                  If information filled above is fake, your account will be
                  deleted upon verification state.
                </p>
              </div>
            </div>
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
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-sky-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
