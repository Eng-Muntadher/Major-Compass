import { User, Edit2 } from "lucide-react";
import ProfileInfoSection from "./ProfileInfoSection";

interface ProfileHeaderProps {
  userName: string;
  userGrade: string;
  email: string;
  savedCount: number;
  isEditing: boolean;
  onEditClick: () => void;
  onSave: () => void;
  onCancel: () => void;
  onUserNameChange?: (name: string) => void;
  onEmailChange?: (email: string) => void;
  onGradeChange?: (grade: string) => void;
}

export default function ProfileHeader({
  userName,
  userGrade,
  email,
  savedCount,
  isEditing,
  onEditClick,
  onSave,
  onCancel,
  onUserNameChange,
  onEmailChange,
  onGradeChange,
}: ProfileHeaderProps) {
  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <User className="w-10 h-10" aria-hidden="true" />
          </div>
          <div>
            {isEditing ? (
              <label htmlFor="user-name" className="sr-only">
                Your user name
              </label>
            ) : null}
            {isEditing ? (
              <input
                id="user-name"
                type="text"
                value={userName}
                onChange={(e) => onUserNameChange?.(e.target.value)}
                className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-2xl outline-none border-2 border-white/40 focus:border-white"
                aria-label="Edit your name"
              />
            ) : (
              <h1 className="text-3xl mb-1 font-semibold">{userName}</h1>
            )}
            <p className="opacity-90">{userGrade}</p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={onEditClick}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            aria-label="Edit profile"
          >
            <Edit2 className="w-4 h-4" aria-hidden="true" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2" role="group" aria-label="Edit actions">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Cancel editing"
            >
              Cancel
            </button>

            <button
              onClick={onSave}
              className="px-4 py-2 bg-white hover:bg-white/90 text-blue-600 rounded-lg transition-colors"
              aria-label="Save changes"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <ProfileInfoSection
        email={email}
        grade={userGrade}
        savedCount={savedCount}
        isEditing={isEditing}
        onEmailChange={onEmailChange}
        onGradeChange={onGradeChange}
      />
    </header>
  );
}
