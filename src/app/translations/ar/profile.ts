import { ProfileTranslationTypes } from "../en/profile";

const profile: ProfileTranslationTypes = {
  header: {
    editProfile: "تعديل الملف الشخصي",
    cancel: "إلغاء",
    save: "حفظ",
    saving: "جاري الحفظ...",
    changeAvatar: "تغيير",
    usernameLabel: "اسم المستخدم",
    gradeNotSet: "لم يتم تعيين الصف",
  },
  info: {
    email: "البريد الإلكتروني",
    grade: "الصف",
    savedMajors: "التخصصات المحفوظة",
  },
  sections: {
    savedMajors: {
      title: "المحفوظة مؤخراً",
      noSaved: "لا توجد تخصصات محفوظة بعد",
      description: "ابدأ بالاستكشاف واحفظ التخصصات التي تهمك!",
    },
    recentlyViewed: {
      title: "المشاهدة مؤخراً",
      noViewed: "لا توجد تخصصات تم عرضها مؤخراً",
      description: "التخصصات التي تشاهدها ستظهر هنا لسهولة الوصول.",
    },
  },
  errors: {
    notFound: "الملف الشخصي غير موجود",
    contactSupport: "يرجى الاتصال بالدعم.",
  },
  toast: {
    updateSuccess: "تم تحديث الملف الشخصي بنجاح!",
    updateError: "فشل تحديث الملف الشخصي",
  },
};

export default profile;
