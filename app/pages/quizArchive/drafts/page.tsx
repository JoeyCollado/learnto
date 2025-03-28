"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Quiz } from "../published/types";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { useTheme } from "@/app/components/theme-context";


const DraftQuizzes = () => {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Quiz[]>([]);
  const {isDarkMode} = useTheme();

  useEffect(() => {
    // ✅ Load unfinished drafts
    const storedDrafts = localStorage.getItem("draftQuizzes");
    if (storedDrafts) {
      setDrafts(JSON.parse(storedDrafts));
    }
  }, []);

  // ✅ Click draft to continue editing
  const handleEditDraft = (draft: Quiz) => {
    localStorage.setItem("quizTitle", draft.title);
    localStorage.setItem("quizSubject", draft.subject);
    localStorage.setItem("timeLimit", draft.time);
    localStorage.setItem("questions", JSON.stringify(draft.questions));
    localStorage.setItem("dateCreated", draft.dateCreated);

    router.push("/pages/quizCreate"); // Redirect to quiz creation page
  };

  // ✅ Delete draft
  const handleDeleteDraft = (draftId: number) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem("draftQuizzes", JSON.stringify(updatedDrafts));
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-20  mt-[5%] z-10">
          <div className={`${isDarkMode ? "bg-slate-800" : "bg-slate-300"} rounded-md max-h-[580px] overflow-y-auto custom-scroll`}>
            <div className="text-center text-3xl pb-10 mt-10">Drafts</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-16 mx-10 gap-5 md:p-5">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-sky-600 p-4 rounded-md cursor-pointer hover:bg-sky-500 text-center text-gray-700 mt-2"
                >
                  <h3 className="font-bold text-white text-[30px]" onClick={() => handleEditDraft(draft)}>{draft.title || "Untitled Quiz"}</h3>
                  <p className="">Subject: {draft.subject || "No subject"}</p>
                  <p className="">Time Limit: {draft.time || "No time limit"} minutes</p>
                  <p className="">Questions: {draft.questions?.length || 0}</p>
                  <p className="text-sm">Date: {draft.dateCreated || "Unknown"}</p>
                  
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded-md mt-2 hover:bg-red-500"
                    onClick={() => handleDeleteDraft(draft.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DraftQuizzes;
