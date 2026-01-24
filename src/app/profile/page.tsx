"use client";

import { majors } from "../_data/majors";
import { useState } from "react";
import ProfileHeader from "../_components/ProfileHeader";
import SavedMajorsSection from "../_components/SavedMajorsSection";
import RecentlyViewedSection from "../_components/RecentlyViewedSection";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("Demo Student");
  const [userEmail, setUserEmail] = useState("example@example.com");
  const [userGrade, setUserGrade] = useState("Fourth");

  const savedMajorsList = [majors[0], majors[1]];
  const recentlyViewedList = [majors[0], majors[1]];

  const handleSave = () => {
    // Save user data logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset any unsaved changes
    setIsEditing(false);
  };

  const handleToggleSave = (id: string) => {
    // Toggle save status
    console.log("Toggle save:", id);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <ProfileHeader
        userName={userName}
        userGrade={userGrade}
        email={userEmail}
        savedCount={savedMajorsList.length}
        isEditing={isEditing}
        onEditClick={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
        onUserNameChange={setUserName}
        onEmailChange={setUserEmail}
        onGradeChange={setUserGrade}
      />

      <SavedMajorsSection
        majors={savedMajorsList}
        onToggleSave={handleToggleSave}
      />

      <RecentlyViewedSection majors={recentlyViewedList} />
    </div>
  );
}
