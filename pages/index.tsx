import Header from "@/components/Header";
import QuestionsList from "@/components/QuestionsList";
import SpeakerSelect from "@/components/SpeakerSelect";
import { useMutation, useStorage } from "@/liveblocks.config";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function HomePage() {
  const [speaker, setSpeaker] = useState("");
  const [draft, setDraft] = useState("");
  const [from, setFrom] = useState("");

  const questions = useStorage((root) => root.questions);
  const status = useStorage((root) => root.status);

  const askQuestion = useMutation(({ storage }, speaker, text, from) => {
    if (status && !status.open) {
      return toast.error("Questions are not currently being accepted.");
    }

    if (speaker === "") {
      return toast.error("Please select a speaker.");
    }

    if (text === "") {
      return toast.error("Please enter a question.");
    }

    if (text.length < 3) {
      return toast.error("Please enter a complete question.");
    }

    if (from === "") {
      return toast.error("Please enter your full name.");
    }

    if (
      questions &&
      questions.filter((q) => q.speaker === speaker && q.from === from).length >
        0
    ) {
      return toast.error(
        `You already submitted a question for ${speaker}. Please select a different speaker for your next question.`
      );
    }

    storage.get("questions").push({ speaker, text, from });
    toast.success("Question submitted!");
    setDraft("");
  }, []);

  return (
    <div className="container">
      <Header title="Speaker Q&A" />

      <div className="form">
        <SpeakerSelect setSpeaker={setSpeaker} />

        <label htmlFor="from" hidden>
          Your question
        </label>
        <input
          type="text"
          name="question"
          placeholder="What would you like to know?"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion(speaker, draft, from);
            }
          }}
        />

        <label htmlFor="from" hidden>
          Your name
        </label>
        <input
          type="text"
          name="from"
          placeholder="What is your name?"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion(speaker, draft, from);
            }
          }}
        />

        {status && status.open === false ? (
          <p>This Q&A session is currently closed.</p>
        ) : (
          <></>
        )}

        <button
          className="add-button"
          onClick={() => askQuestion(speaker, draft, from)}
        >
          Submit <ChevronRightIcon />
        </button>
      </div>

      <QuestionsList
        questions={questions && questions?.filter((q) => q.from === from)}
      />
    </div>
  );
}
