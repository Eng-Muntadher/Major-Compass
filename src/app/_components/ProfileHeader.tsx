"use client";

import { useState, useTransition } from "react";
import { User, Edit2 } from "lucide-react";
import ProfileInfoSection from "./ProfileInfoSection";
import { updateProfile } from "../actions";
import toast from "react-hot-toast";
import Image from "next/image";

interface ProfileHeaderProps {
  username: string;
  email: string;
  grade: string;
  avatarUrl: string | null;
  bookmarksCount: number;
}

interface EditableProfile {
  username: string;
  grade: string;
  avatarUrl: string | null;
  avatarFile: File | null; // only set when user picks a new file
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

  const serverProfile = { username, grade, avatarUrl };

  // Local draft state that the edit form mutates.
  const [draft, setDraft] = useState<EditableProfile>({
    username,
    grade,
    avatarUrl,
    avatarFile: null,
  });

  const handleEdit = () => {
    // Reset draft to current server values before opening the form.
    setDraft({
      username: serverProfile.username,
      grade: serverProfile.grade,
      avatarUrl: serverProfile.avatarUrl,
      avatarFile: null,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (draft.avatarFile && draft.avatarUrl) {
      URL.revokeObjectURL(draft.avatarUrl);
    }
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (draft.avatarFile && draft.avatarUrl) {
      URL.revokeObjectURL(draft.avatarUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, avatarFile: file, avatarUrl: previewUrl }));
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("username", draft.username);
        formData.append("grade", draft.grade);

        // Only send the avatar file if the user actually picked a new one.
        if (draft.avatarFile) {
          formData.append("avatar", draft.avatarFile);
        }

        await updateProfile(formData);

        // Clean up the blob URL now that the save succeeded.
        // (The server will have returned a real URL on next page load.)
        if (draft.avatarFile && draft.avatarUrl) {
          URL.revokeObjectURL(draft.avatarUrl);
        }

        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to update profile");
        // Stay in edit mode so the user can retry or cancel.
      }
    });
  };

  const displayAvatarUrl = isEditing
    ? draft.avatarUrl
    : serverProfile.avatarUrl;

  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden">
            {displayAvatarUrl ? (
              <Image
                fill
                src={displayAvatarUrl}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10" aria-hidden="true" />
            )}

            {/* File input — visually hidden but clickable via the label below */}
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
                <span className="text-xs font-semibold text-center px-1 leading-tight">
                  Change
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="sr-only"
                  aria-label="Upload avatar"
                />
              </label>
            )}
          </div>

          <div>
            {isEditing ? (
              <>
                <label htmlFor="profile-username" className="sr-only">
                  Username
                </label>
                <input
                  id="profile-username"
                  name="username"
                  type="text"
                  value={draft.username}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, username: e.target.value }))
                  }
                  className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-2xl outline-none border-2 border-white/40 focus:border-white"
                  required
                />
              </>
            ) : (
              <h1 className="text-3xl mb-1 font-semibold">
                {serverProfile.username}
              </h1>
            )}
            <p className="opacity-90">
              {(isEditing ? draft.grade : serverProfile.grade) ||
                "Grade not set"}
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            aria-label="Edit profile"
          >
            <Edit2 className="w-4 h-4" aria-hidden="true" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2" role="group" aria-label="Edit actions">
            <button
              onClick={handleCancel}
              disabled={isPending}
              type="button"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Cancel editing"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={isPending}
              type="button"
              className="px-4 py-2 bg-white hover:bg-white/90 text-blue-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Save changes"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      <ProfileInfoSection
        email={email}
        grade={isEditing ? draft.grade : serverProfile.grade}
        savedCount={bookmarksCount}
        isEditing={isEditing}
        onGradeChange={(newGrade) =>
          setDraft((prev) => ({ ...prev, grade: newGrade }))
        }
      />
    </header>
  );
}
