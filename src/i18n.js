import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav_home: "Home",
          nav_about: "About",
          hero_title: "Building digital experiences",
          hero_subtitle: "from a mobile screen with Gemini assistance",
          hero_desc: "Beginner Full-stack Developer focusing on React and PHP.",
          explore_btn: "Explore My Work",
          guestbook_title: "Guestbook",
          name_label: "Full Name",
          email_label: "Email (Optional),can't change it ",
          comment_placeholder: "What's on your mind?",
          submit_btn: "Post Comment",
          loading: "Loading comments...",
          who_am_i: "Who am I?",
          bio: "I am an aspiring full-stack developer starting my journey from a mobile phone. I believe creativity doesn't need high-end devices.",
          footer_text:"Developed by Ismail via Mobile with gemini assistance",
          my_pro:"My project",
          project:"This Portfolio (website) is my first public project",
          close_img:"Click anywhere to close",
          comments:"comments",
          wait_msg:"Please! Wait : "
        }
      },
      ar: {
        translation: {
          nav_home: "الرئيسية",
          nav_about: "عني",
          hero_title: "بناء تجارب رقمية",
          hero_subtitle: " من شاشة الهاتف بمساعدة Gemini",
          hero_desc: "مطور Full-stack مبتدئ مهتم بـ React و PHP.",
          explore_btn: "استكشف أعمالي",
          guestbook_title: "سجل الزوار",
          name_label: "الاسم الكامل",
          email_label: " البريد الإلكتروني (اختياري) لا يمكن تغييره",
          comment_placeholder: "ماذا يدور في ذهنك؟",
          submit_btn: "إرسال التعليق",
          loading: "جاري تحميل التعليقات...",
          who_am_i: "من أنا؟",
          bio: "أنا مطور واجهات خلفية وأمامية طموح، بدأت رحلتي من الهاتف المحمول. أؤمن أن الإبداع لا يحتاج لأجهزة خارقة.",
          footer_text:" برمج من طرف اسماعيل من خلال الهاتف بمساعدة من gemini",
          my_pro:"اعمالي ",
          project:"هذه المدونة الشخصية هي اول مشروع منشور لي ",
          close_img:"اضغط في اي مكان لإغلاق الصورة" ,
          comments:"التعليقات ",
          wait_msg:"المرجوا انتضار :",
          
        }
      }
    },
    fallbackLng: "en",
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
