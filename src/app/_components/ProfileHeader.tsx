"use client";

import { User, Edit2 } from "lucide-react";
import ProfileInfoSection from "./ProfileInfoSection";
import { useState, useOptimistic, useTransition } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { updateProfile } from "../actions";

interface ProfileHeaderProps {
  username: string | null;
  email: string | null;
  grade: string | null;
  avatarUrl: string | null;
  bookmarksCount: number;
}

interface ProfileData {
  username: string;
  email: string;
  grade: string;
  avatarUrl: string | null;
}

export default function ProfileHeader({
  username,
  email,
  grade,
  avatarUrl,
  bookmarksCount,
}: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const initialProfile: ProfileData = {
    username: username || "",
    email: email || "",
    grade: grade || "",
    avatarUrl: avatarUrl,
  };

  // Optimistic state
  const [optimisticProfile, updateOptimisticProfile] = useOptimistic(
    initialProfile,
    (state, newProfile: Partial<ProfileData>) => ({
      ...state,
      ...newProfile,
    }),
  );

  const handleSave = (formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const grade = formData.get("grade") as string;

    startTransition(async () => {
      // Optimistically update UI immediately
      updateOptimisticProfile({ username, email, grade });
      setIsEditing(false);

      try {
        await updateProfile(formData);
        toast.success("Profile updated!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update profile");
        setIsEditing(true); // Re-open edit mode on error
      }
    });
  };

  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            {optimisticProfile.avatarUrl ? (
              <Image
                fill
                src={optimisticProfile.avatarUrl}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10" aria-hidden="true" />
            )}
          </div>
          <div>
            {isEditing ? (
              <form action={handleSave}>
                <label htmlFor="user-name" className="sr-only">
                  Your user name
                </label>
                <input
                  id="user-name"
                  name="username"
                  type="text"
                  defaultValue={optimisticProfile.username || ""}
                  className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-2xl outline-none border-2 border-white/40 focus:border-white"
                  aria-label="Edit your name"
                  required
                />
              </form>
            ) : (
              <h1 className="text-3xl mb-1 font-semibold">
                {optimisticProfile.username}
              </h1>
            )}
            <p className="opacity-90">
              {optimisticProfile.grade || "Grade not set"}
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            aria-label="Edit profile"
          >
            <Edit2 className="w-4 h-4" aria-hidden="true" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2" role="group" aria-label="Edit actions">
            <button
              onClick={() => setIsEditing(false)}
              disabled={isPending}
              type="button"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Cancel editing"
            >
              Cancel
            </button>

            <button
              onClick={(e) => {
                const form = e.currentTarget
                  .closest("header")
                  ?.querySelector("form");
                if (form) {
                  const formData = new FormData(form);
                  handleSave(formData);
                }
              }}
              disabled={isPending}
              type="button"
              className="px-4 py-2 bg-white hover:bg-white/90 text-blue-600 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Save changes"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      <ProfileInfoSection
        email={optimisticProfile.email || ""}
        grade={optimisticProfile.grade}
        savedCount={bookmarksCount}
        isEditing={isEditing}
      />
    </header>
  );
}
