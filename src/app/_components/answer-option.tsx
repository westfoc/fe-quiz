import type { AnswerType } from "~/types";
import { colorSelectedAnswer } from "~/utils";

interface AnswerOptionProps {
  answerOption: AnswerType;
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedAnswer: string;
  correctAnswer: string;
}

export default function AnswerOption({
  answerOption,
  handleOnClick,
  selectedAnswer,
  correctAnswer,
}: AnswerOptionProps) {
  return (
    <>
      {Object.entries(answerOption).map(([k, v]) => (
        <button
          key={k}
          id={k}
          onClick={handleOnClick}
          className={`mb-4 flex w-full space-x-6 rounded-lg border ${colorSelectedAnswer(
            k,
            selectedAnswer,
            correctAnswer,
          )} p-5 text-left`}
        >
          <div>
            <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-black bg-white">
              <p className="font-bold text-black">{k}</p>
            </div>
          </div>
          <p className="text-black">{v}</p>
        </button>
      ))}
    </>
  );
}
