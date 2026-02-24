import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
    Github,
    Facebook,
    Instagram,
    MessageSquare,
    User,
    AtSign
} from "lucide-react";

function About() {
    let tes = 0;
    const { t, i18n } = useTranslation();
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: ""
    });
    const [statusMsg, setStatusMsg] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [isLocked, setIsLocked] = useState({ name: false, email: false });
    const [isSending, setIsSending] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // ✅ Using environment variables for API URL
    const API_URL =
        /*"/php"//import.meta.env.VITE_API_URL ||*/ "http://localhost:3001";

    useEffect(() => {
        const savedName = localStorage.getItem("user_name");
        const savedEmail = localStorage.getItem("user_email");
        // alert(savedName)
        // alert(savedEmail)
        if (savedName) {
            setFormData(prev => ({
                ...prev,
                name: savedName,
                email: savedEmail
            }));

            // let newlock = {...isLocked};
            // newlock.name=true
            setIsLocked(prev => ({ ...prev, name: true }));
        }
        if (savedEmail) {
            setFormData(prev => ({
                ...prev,
                name: savedName,
                email: savedEmail
            }));
            setIsLocked(prev => ({ ...prev, email: true }));
        }
        fetchComments();
    }, []);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 100);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const fetchComments = async (pageNum = 1, isLoadMore = false) => {
        try {
            const res = await axios.get(
                `${API_URL}/Api.php?page=${pageNum}&limit=10`
            );
            const newComments = res.data.data.comments || [];

            if (isLoadMore) {
                setComments(prev => [...prev, ...newComments]);
            } else {
                //
                setComments(newComments);
            }

            setHasMore(res.data.data.hasMore);
            setPage(pageNum);
        } catch (err) {
            // ✅ Better error handling
            console.error("Fetch error:", err);
            setStatusMsg(
                i18n.language === "ar"
                    ? "فشل تحميل التعليقات"
                    : "Failed to load comments"
            );
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (countdown > 0 || isSending) return;

        setIsSending(true);
        setStatusMsg("");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("comment", formData.comment);
        const token = localStorage.getItem("brow_token");
        if (token) data.append("token", token);

        try {
            const res = await axios.post(`${API_URL}/Api.php`, data);
            setCountdown(30); // ✅ Unified to 30 seconds (matching backend)
            setStatusMsg(res.data.message);

            if (!localStorage.getItem("user_name")) {
                localStorage.setItem("user_name", formData.name);
                setIsLocked(prev => ({ ...prev, name: true }));
            }
            if (!localStorage.getItem("user_email")) {
                localStorage.setItem("user_email", formData.email);
                setIsLocked(prev => ({ ...prev, email: true }));
            }

            if (res.data.brow_token)
                localStorage.setItem("brow_token", res.data.brow_token);
            setFormData(prev => ({ ...prev, comment: "" }));
            fetchComments();
        } catch (err) {
            // ✅ Better error handling
            const errorMsg =
                err.response?.data?.message ||
                (i18n.language === "ar" ? "حدث خطأ" : "Error occurred");
            setStatusMsg(errorMsg);
            console.error("Submit error:", err);
        } finally {
            setIsSending(false);
        }
    };
    function getColorFromName(name) {
    const colors = [
        "#F44336", // red
        "#E91E63", // pink
        "#9C27B0", // purple
        "#3F51B5", // indigo
        "#2196F3", // blue
        "#03A9F4", // light blue
        "#009688", // teal
        "#4CAF50", // green
        "#FF9800", // orange
        "#795548", // brown
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash % colors.length);
    return colors[index];
}
const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  // تثبيت درجة التشبع عند 70% والإضاءة عند 50% لضمان ألوان مريحة للعين
  return `hsl(${hash % 360}, 70%, 50%)`;
};


    return (
        <div className="py-10 space-y-24">
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h1 className="text-[#d97706] font-bold text-xl uppercase tracking-[0.3em]">
                        {t("who_am_i")}
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        {t("bio")}
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="p-2 border border-gray-800 rounded-full hover:border-[#d97706] transition-all"
                        >
                            <Instagram size={25} />
                        </a>
                        <a
                            href="#"
                            className="p-2 border border-gray-800 rounded-full hover:border-[#d97706] transition-all"
                        >
                            <Facebook size={25} />
                        </a>
                        <a
                            href="https://github.com/IsmailTahmout"
                            target="_blank"
                            className="p-2 border border-gray-800 rounded-full hover:border-[#d97706] transition-all"
                        >
                            <Github size={25} />
                        </a>
                    </div>
                </div>
                <img
                    src="/me.jpg"
                    className="w-64 h-80 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all shadow-2xl justify-self-center"
                    alt="Ismail"
                />
                <h1 className="text-[#d97706] font-bold text-xl uppercase tracking-[0.3em]">
                    {t("my_pro")}
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed ">
                    <span className="px-1.5 text-2xl text-[#d97706]">+</span>
                    {t("project")}
                </p>
            </section>

            <section className="max-w-2xl mx-auto w-full border-t border-gray-900 pt-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <MessageSquare className="text-[#d97706]" />{" "}
                    {t("guestbook_title")}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className={`bg-[#111] p-6 rounded-2xl border border-gray-800 space-y-4 transition-all duration-700 ${countdown > 0 ? "opacity-60 blur-[1px] pointer-events-none" : "opacity-100"}`}
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative">
                            <User
                                className="absolute left-3 top-3 text-gray-600"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder={t("name_label")}
                                required
                                value={formData.name}
                                readOnly={isLocked.name}
                                className={`w-full bg-[#0a0a0a] border border-gray-800 p-2 pl-10 rounded-lg outline-none focus:border-[#d97706] ${isLocked.name ? "text-gray-500" : ""}`}
                                onChange={e =>
                                    !isLocked.name &&
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="relative">
                            <AtSign
                                className="absolute left-3 top-3 text-gray-600"
                                size={16}
                            />
                            <input
                                type="email"
                                placeholder={t("email_label")}
                                value={formData.email}
                                readOnly={isLocked.email}
                                className={`w-full bg-[#0a0a0a] border border-gray-800 p-2 pl-10 rounded-lg outline-none focus:border-[#d97706] ${isLocked.email ? "text-gray-500" : ""}`}
                                onChange={e =>
                                    !isLocked.email &&
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <textarea
                        placeholder={t("comment_placeholder")}
                        required
                        value={formData.comment}
                        className="w-full bg-[#0a0a0a] border border-gray-800 p-4 h-32 rounded-lg outline-none focus:border-[#d97706] resize-none"
                        onChange={e =>
                            setFormData({
                                ...formData,
                                comment: e.target.value
                            })
                        }
                    ></textarea>

                    <button
                        type="submit"
                        disabled={countdown > 0 || isSending}
                        className={`w-full bg-white  font-bold py-3 rounded-lg hover:bg-[#d97706] hover:text-white transition-all text-xs tracking-widest uppercase disabled:bg-zinc-900 disabled:text-zinc-600
                        ${countdown > 0 ? "text-white" : "text-black"}`}
                    >
                        {isSending
                            ? i18n.language === "ar"
                                ? "جاري الإرسال..."
                                : "Sending..."
                            : countdown > 0
                              ? `${t("wait_msg")} ${countdown}s`
                              : t("submit_btn")}
                    </button>
                </form>

                {statusMsg && countdown === 0 && (
                    <p className="text-center text-[#d97706] text-[10px] mt-4 uppercase">
                        {statusMsg}
                    </p>
                )}

                <div className="mt-12 space-y-6">
                    <h1 className="text-[white] font-bold text-xl uppercase tracking-[0.3em]">
                        {t("comments")}
                    </h1>
                    {comments
                        .filter(c => c.appearance == 1)
                        .map(comment => (
                            <div
                                key={comment.id}
                                className="border-b border-gray-900 pb-4"
                            >
                                <div className="flex justify-between items-center mb-1 ">
                                    <div className="flex flex-row justify-between items-center ml-1  gap-2">
                                        <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold "
                                        style={{backgroundColor:getAvatarColor(comment.name)}}>
                                            {comment.name[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-[#d97706] uppercase">
                                                {comment.name}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-gray-600">
                                        {new Date(
                                            comment.create_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm pl-10">
                                    {comment.comment_text}
                                </p>
                            </div>
                        ))}
                    {hasMore && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => fetchComments(page + 1, true)}
                                className="text-xs font-bold text-[#d97706] border border-[#d97706]/30 px-6 py-2 rounded-full hover:bg-[#d97706] hover:text-white transition-all uppercase tracking-widest"
                            >
                                {t("load_more") || "Load More"}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default About;
