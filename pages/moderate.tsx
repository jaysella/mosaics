import Header from "@/components/Header";
import QuestionsList from "@/components/QuestionsList";
import { useMutation, useStorage } from "@/liveblocks.config";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ModeratePage() {
  const [filterSpeaker, setFilterSpeaker] = useState<string>();
  const questions = useStorage((root) => root.questions);
  const status = useStorage((root) => root.status);

  const toggleStatus = useMutation(({ storage }, open) => {
    storage.get("status").update({ open: !open });
    toast.success("Q&A status updated!");
  }, []);

  return (
    <div className="container">
      <Header title="Q&A Moderation" />

      <p>
        {status?.open ? "Accepting New Questions" : "NOT Accepting Questions"}{" "}
        <button
          className="add-button"
          onClick={() => toggleStatus(status?.open)}
        >
          Toggle
        </button>
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <button
          className="add-button"
          onClick={() => setFilterSpeaker(undefined)}
          style={{ whiteSpace: "nowrap" }}
        >
          All ({questions?.length})
        </button>
        {[
          "Pratika Katiyar",
          "Debpriya Das",
          "Catherine Murphy",
          "Andre Neto Caetano",
          "Alexander Qiu",
          "Khushi Gandhi",
          "Ren Birnholz",
        ].map((s) => (
          <button
            key={s}
            className="add-button"
            onClick={() => setFilterSpeaker(s)}
            style={{ whiteSpace: "nowrap" }}
          >
            {s.split(" ")[0]} (
            {questions && questions.filter((q) => q.speaker === s).length})
          </button>
        ))}
      </div>

      <QuestionsList
        questions={
          questions && filterSpeaker
            ? questions.filter((q) => q.speaker === filterSpeaker)
            : questions
        }
        moderate
      />
    </div>
  );
}
