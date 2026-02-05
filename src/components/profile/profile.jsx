"use client";

import { AuthsContext } from "@/context/AuthsContext";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { appwriteConfig, databases } from "@/lib/appwrite/config";

const Profile = () => {
  const { currentUser } = useContext(AuthsContext);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({});

  const handleSave = async () => {
    if (editMode) {
      const response = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        currentUser.$id,
        profile
      );
      setEditMode(false);
    }
  };

  return (
    <section className="h-full p-4 pt-8 lg:px-8 w-full">
      <h1 className="text-2xl font-bold mb-5">My Profile</h1>
      <div className="w-full space-y-5">
        <div className="w-full flex gap-9 justify-between p-5 border border-zinc-700 rounded-xl">
          <div className="flex gap-9">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              src={currentUser?.data?.imageUrl}
              alt={currentUser?.data?.name}
              width={95}
              height={95}
              className="w-[75px] h-[75px] rounded-full object-cover"
            />
            <div className="w-full">
              <h1 className="md:text-xl font-bold">
                {currentUser?.data?.name}
              </h1>
              <p className="text-sm md:text-normal text-zinc-400">
                @{currentUser?.data?.username}
              </p>
              <p className="text-sm md:text-normal text-zinc-400">
                {currentUser?.data?.email}
              </p>
            </div>
          </div>
          <div
            onClick={() => setEditMode(!editMode)}
            className="p-2.5 self-start bg-zinc-700 hover:bg-zinc-600 cursor-pointer transition rounded-full"
          >
            <Edit className="text-white" />
          </div>
        </div>
        {!currentUser?.data?.isAdmin && (
          <>
            <div className="w-full flex flex-col p-5 border border-zinc-700 rounded-xl">
              <h1 className="text-xl font-bold mb-5">Work Information</h1>
              <div className="grid grid-cols-2 gap-7">
                <Field
                  title="College"
                  description={currentUser?.data?.college}
                  editMode={editMode}
                  value={profile?.college}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, college: e.target.value }))
                  }
                />
                <Field
                  title="University"
                  description={currentUser?.data?.university}
                  editMode={editMode}
                  value={profile?.university}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      university: e.target.value,
                    }))
                  }
                />
                <Field
                  title="Graduation Year"
                  description={currentUser?.data?.graduationYear}
                  editMode={editMode}
                  value={profile?.graduationYear}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      graduationYear: parseInt(e.target.value),
                    }))
                  }
                />
                {currentUser?.data?.isAlumni && (
                  <>
                    <Field
                      title="Company Name"
                      description={currentUser?.data?.companyName}
                      editMode={editMode}
                      value={profile?.companyName}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                    />
                    <Field
                      title="Company Position"
                      description={currentUser?.data?.companyPos}
                      editMode={editMode}
                      value={profile?.companyPos}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          companyPos: e.target.value,
                        }))
                      }
                    />
                    <Field
                      title="Employment Type"
                      description={currentUser?.data?.employmentType}
                      editMode={editMode}
                      value={profile?.employmentType}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          employmentType: e.target.value,
                        }))
                      }
                    />
                    <Field
                      title="Company Location"
                      description={currentUser?.data?.companyLocation}
                      editMode={editMode}
                      value={profile?.companyLocation}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          companyLocation: e.target.value,
                        }))
                      }
                    />
                    <Field
                      title="Company Start Date"
                      description={
                        currentUser?.data?.companyStartDate
                          ? new Intl.DateTimeFormat("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }).format(
                              new Date(currentUser?.data?.companyStartDate)
                            )
                          : "N/A"
                      }
                      editMode={editMode}
                      value={profile?.companyStartDate}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          companyStartDate: e.target.value,
                        }))
                      }
                    />
                    <Field
                      title="Is Currently Working"
                      description={`${
                        currentUser?.data?.isCurrentlyWorking ? "Yes" : "No"
                      }`}
                      editMode={editMode}
                      value={profile?.isCurrentlyWorking}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          isCurrentlyWorking: e.target.checked,
                        }))
                      }
                    />
                    {!currentUser?.data?.isCurrentlyWorking ? (
                      <Field
                        title="Company End Date"
                        description={
                          currentUser?.data?.companyEndDate
                            ? new Intl.DateTimeFormat("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(
                                new Date(currentUser?.data?.companyEndDate)
                              )
                            : "N/A"
                        }
                        editMode={editMode}
                        value={profile?.companyEndDate}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            companyEndDate: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <Field
                        title="Status"
                        description="Currently Working"
                        editMode={editMode}
                      />
                    )}
                  </>
                )}
              </div>
              {editMode && (
                <Button className="self-center w-24 mt-3" onClick={handleSave}>
                  Save
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;

const Field = ({ title, description, editMode, value, onChange }) => {
  return (
    <div className="w-full">
      <p className="text-zinc-400 font-bold md:text-md">{title}</p>
      {!editMode ? (
        <p className="md:text-lg">{description}</p>
      ) : (
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={description}
        />
      )}
    </div>
  );
};
