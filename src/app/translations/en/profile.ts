const profile = {
  header: {
    editProfile: "Edit Profile",
    cancel: "Cancel",
    save: "Save",
    saving: "Saving...",
    changeAvatar: "Change",
    usernameLabel: "Username",
    gradeNotSet: "Grade not set",
  },
  info: {
    email: "Email",
    grade: "Grade",
    savedMajors: "Saved Majors",
  },
  sections: {
    savedMajors: {
      title: "Saved Majors",
      noSaved: "No saved majors yet",
      description: "Start exploring and bookmark majors you're interested in!",
    },
    recentlyViewed: {
      title: "Recently Viewed",
      noViewed: "No recently viewed majors",
      description: "Majors you view will appear here for easy access.",
    },
  },
  errors: {
    notFound: "Profile Not Found",
    contactSupport: "Please contact support.",
  },
  toast: {
    updateSuccess: "Profile updated successfully!",
    updateError: "Failed to update profile",
  },
};

export type ProfileTranslationTypes = typeof profile;
export default profile;
