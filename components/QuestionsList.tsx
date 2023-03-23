import { useMutation } from "@/liveblocks.config";
import { toast } from "react-hot-toast";

export default function QuestionsList({
  questions,
  moderate,
}: {
  questions: readonly any[] | null;
  moderate?: boolean;
}) {
  const removeQuestion = useMutation(({ storage }, index) => {
    storage.get("questions").delete(index);
    toast.success("Question removed.");
  }, []);

  return (
    <div className="questions-container">
      {questions && questions.length > 0 ? (
        questions.map((q, index) => {
          return (
            <div key={index} className="question-container">
              <div className="question">
                <p className="speaker">
                  For <b>{q.speaker}</b>
                </p>
                <small>From {q.from}</small>

                <p className="question-text">{q.text}</p>
              </div>

              {moderate ? (
                <button
                  className="delete_button"
                  onClick={() => removeQuestion(index)}
                >
                  ✕
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })
      ) : moderate ? (
        <p>No questions.</p>
      ) : (
        <></>
      )}
    </div>
  );
}
