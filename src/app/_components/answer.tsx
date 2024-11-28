import type { Question } from "~/types";
import { formatResponse } from "~/utils";

interface AnswerProps {
  selectedAnswer: string;
  data: Question[];
  currentQuestionIdx: number;
  handleOnClickNext: () => void;
}

export default function Answer({
  selectedAnswer,
  data,
  currentQuestionIdx,
  handleOnClickNext,
}: AnswerProps) {
  const formattedResponse = formatResponse(
    selectedAnswer,
    data,
    currentQuestionIdx,
  );
  return (
    <>
      {selectedAnswer ? (
        <div className="flex flex-col gap-4">
          <p>{formattedResponse}</p>
          {currentQuestionIdx === data.length - 1 ? null : (
            <div>
              <button
                onClick={handleOnClickNext}
                disabled={currentQuestionIdx === data.length - 1}
                className="md cursor-pointer rounded bg-white p-4 text-black hover:bg-slate-300 disabled:bg-slate-600"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
