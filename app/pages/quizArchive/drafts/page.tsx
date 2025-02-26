"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Quiz } from "../published/types";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";

const DraftQuizzes = () => {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Quiz[]>([]);

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

    router.push("/pages/quizCreate"); // Redirect to quiz creation page
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6 mt-[5%]">
          <div className="bg-slate-600 rounded-md p-6 max-h-[580px] overflow-y-auto custom-scroll">
            <div className="text-center text-3xl py-2 pb-10">Drafts</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-yellow-500 p-4 rounded-md cursor-pointer hover:bg-yellow-400"
                  onClick={() => handleEditDraft(draft)}
                >
                  <h3 className="text-xl font-bold">{draft.title || "Untitled Quiz"}</h3>
                  <p className="text-sm">Subject: {draft.subject || "No subject"}</p>
                  <p className="text-sm">Questions: {draft.questions?.length || 0}</p>
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
