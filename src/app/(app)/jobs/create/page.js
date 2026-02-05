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
import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { ID } from "appwrite";

export default function CreateJobsPage() {
  const router = useRouter();
  const {
    currentUser,
    loading: isLoading,
    register,
  } = useContext(AuthsContext);

  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [isLink, setIsLink] = useState(false);
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);

  /*========[NOTFICATION SYSTEM]========*/
  const errNotification = (err) => toast.error(err);
  const infoNotification = (info) => toast.info(info);

  /*=====[USESTATE HOOKS & UTILITIES]=====*/
  const [loading, setLoading] = useState(false);

  /*=====[AUTHENTICATION SYSTEM]=====*/
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    /*=====[ NEW USER CREATION ]=====*/
    try {
      if (!companyName || !description) {
        throw new Error("All fields are required");
      }

      const createJobs = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.jobCollectionId,
        ID.unique(),
        {
          company_name: companyName,
          description,
          link: isLink ? link : null,
          tags: tags.split(","),
          userId: currentUser.$id,
          creator: currentUser.name,
        }
      );

      /*=====[ Set loading to false & navigate to home ]=====*/
      setLoading(false);
      toast.success("Successfully created job post here");
      router.push("/home");

      /*=====[ ERROR HANDLING ]=====*/
    } catch (err) {
      console.log(err);
      errNotification(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-evenly dark:bg-zinc-900 h-full">
      <Card className="relative w-full h-auto p-8 md:w-[420px] dark:bg-zinc-900 border-dashed border-zinc-700 border-[2.5px]">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Create new job posts</CardTitle>
          <CardDescription>Create some new job posts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-0 pb-0 h-auto">
          <form className="space-y-2.5">
            <Input
              disabled={loading}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              type="text"
              required
            />
            <Input
              disabled={loading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              type="text"
              required
            />
            <Input
              disabled={loading}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (Comma separated)"
              type="text"
              required
            />
            <div className="[background:linear-gradient(45deg,theme(colors.zinc.900),theme(colors.zinc.800)_50%,theme(colors.zinc.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.zinc.600/.48)_80%,_theme(colors.zinc.500)_86%,_theme(colors.zinc.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.blue.600/.48))_border-box] rounded-xl border border-transparent animate-border">
              {" "}
              <div
                className={`relative flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 ${
                  loading ? "opacity-50 cursor-not-allowed" : "opcaity-100"
                }`}
              >
                <Checkbox
                  checked={isLink}
                  onCheckedChange={(e) => setIsLink(e)}
                  required
                />
                <div className="space-y-1 leading-none">
                  <Label>Does this has an external form?</Label>
                  <p className="text-sm text-muted-foreground">
                    If your job has an external form, please check this box
                  </p>
                </div>
              </div>
            </div>
            {isLink && (
              <Input
                disabled={loading}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Link"
                type="text"
                required
              />
            )}
            <Button
              onClick={(e) => handleSubmit(e)}
              className="w-full"
              size="lg"
              disabled={loading}
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://ik.imagekit.io/eagledev/img-i3Y3UD46ld0h00lheZgEi_juU_u6DTi.jpeg?updatedAt=1712685083176"
        className="w-[420px] h-auto rounded-xl"
        alt="create jobs side display image"
      />
    </main>
  );
}
