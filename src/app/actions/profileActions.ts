"use server";

import { createClient } from "@/app/_lib/supabase";
import { revalidatePath } from "next/cache";
import { t, type Lang } from "./actionsTranslation";

export async function updateProfile(formData: FormData, lang: Lang = "en") {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: t(lang, "notAuthenticated") };
  }

  const username = formData.get("username") as string;
  const grade = formData.get("grade") as string;
  const avatarFile = formData.get("avatar");

  let avatar_url: string | null = null;

  // Only upload if the user actually picked a new file.
  // formData.get returns null if the key is missing, or a string if it's
  // a text field — neither of which is a File.
  if (avatarFile instanceof File) {
    const extension = avatarFile.name.split(".").pop();

    // Delete whatever is in this user's folder first.
    const { error: listError, data: existingFiles } = await supabase.storage
      .from("avatars")
      .list(user.id);

    if (listError) {
      return { error: `${t(lang, "listAvatarsFailed")}: ${listError.message}` };
    }

    if (existingFiles && existingFiles.length > 0) {
      const paths = existingFiles.map((file) => `${user.id}/${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove(paths);

      if (deleteError) {
        return {
          error: `${t(lang, "deleteAvatarFailed")}: ${deleteError.message}`,
        };
      }
    }

    // Now upload the new one.
    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${user.id}/avatar.${extension}`, avatarFile);

    if (uploadError) {
      return {
        error: `${t(lang, "uploadAvatarFailed")}: ${uploadError.message}`,
      };
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    avatar_url = `${urlData.publicUrl}?t=${Date.now()}`;
  }

  // Build the update object. Only include avatar_url if a new one was uploaded,
  // otherwise leave the existing value in the DB untouched.
  const updates: Record<string, string | null> = { username, grade };
  if (avatar_url) {
    updates.avatar_url = avatar_url;
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: true };
}
