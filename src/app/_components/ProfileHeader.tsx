"use client";

import { useState, useTransition } from "react";
import { User, Edit2 } from "lucide-react";
import ProfileInfoSection from "./ProfileInfoSection";
import { updateProfile } from "@/app/actions/profileActions";
import toast from "react-hot-toast";
import Image from "next/image";
import { ProfileTranslationTypes } from "../translations/en/profile";

interface ProfileHeaderProps {
  username: string;
  email: string;
  grade: string;
  avatarUrl: string | null;
  bookmarksCount: number;
  translations: {
    header: ProfileTranslationTypes["header"];
    toast: ProfileTranslationTypes["toast"];
    info: ProfileTranslationTypes["info"];
  };
}

interface EditableProfile {
  username: string;
  grade: string;
  avatarUrl: string | null;
  avatarFile: File | null;
}

export default function ProfileHeader({
  username,
  email,
  grade,
  avatarUrl,
  bookmarksCount,
  translations,
}: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const serverProfile = { username, grade, avatarUrl };

  const [draft, setDraft] = useState<EditableProfile>({
    username,
    grade,
    avatarUrl,
    avatarFile: null,
  });

  const handleEdit = () => {
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

        if (draft.avatarFile) {
          formData.append("avatar", draft.avatarFile);
        }

        await updateProfile(formData);

        if (draft.avatarFile && draft.avatarUrl) {
          URL.revokeObjectURL(draft.avatarUrl);
        }

        toast.success(translations.toast.updateSuccess);
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        toast.error(translations.toast.updateError);
      }
    });
  };

  const displayAvatarUrl = isEditing
    ? draft.avatarUrl
    : serverProfile.avatarUrl;

  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-8 text-white">
      {/* Top section: avatar + username + edit button */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-6">
        {/* Avatar + username */}
        <div className="flex flex-1 items-start sm:items-center gap-4 flex-wrap">
          {/* Avatar */}
          <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {displayAvatarUrl ? (
              <Image
                fill
                src={displayAvatarUrl}
                priority
                alt="user avatar"
                className="object-cover rounded-full"
              />
            ) : (
              <User className="w-10 h-10" aria-hidden="true" />
            )}

            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10 rounded-full text-center">
                <span className="text-xs font-semibold px-1 leading-tight">
                  {translations.header.changeAvatar}
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

          {/* Username + grade */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <>
                <label htmlFor="profile-username" className="sr-only">
                  {translations.header.usernameLabel}
                </label>
                <input
                  id="profile-username"
                  maxLength={30}
                  name="username"
                  type="text"
                  value={draft.username}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, username: e.target.value }))
                  }
                  className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-2xl outline-none border-2 border-white/40 focus:border-white w-full truncate"
                  required
                />
              </>
            ) : (
              <h1 className="text-3xl mb-1 font-semibold truncate">
                {serverProfile.username}
              </h1>
            )}
            <p className="opacity-90 truncate">
              {(isEditing ? draft.grade : serverProfile.grade) ||
                translations.header.gradeNotSet}
            </p>
          </div>
        </div>

        {/* Edit / Save / Cancel buttons */}
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="shrink-0 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            aria-label="Edit profile"
          >
            <Edit2 className="w-4 h-4" aria-hidden="true" />
            <span className="truncate">{translations.header.editProfile}</span>
          </button>
        ) : (
          <div
            className="flex gap-2 shrink-0 flex-wrap"
            role="group"
            aria-label="Edit actions"
          >
            <button
              onClick={handleCancel}
              disabled={isPending}
              type="button"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Cancel editing"
            >
              {translations.header.cancel}
            </button>

            <button
              onClick={handleSave}
              disabled={isPending}
              type="button"
              className="px-4 py-2 bg-white hover:bg-white/90 text-blue-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Save changes"
            >
              {isPending
                ? translations.header.saving
                : translations.header.save}
            </button>
          </div>
        )}
      </div>

      {/* Profile Info Section */}
      <ProfileInfoSection
        email={email}
        grade={isEditing ? draft.grade : serverProfile.grade}
        savedCount={bookmarksCount}
        isEditing={isEditing}
        onGradeChange={(newGrade) =>
          setDraft((prev) => ({ ...prev, grade: newGrade }))
        }
        translations={translations.info}
      />
    </header>
  );
}
