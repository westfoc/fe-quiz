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
      {Object.entries(answerOption).map(
        ([answerOptionLetter, answerOptionValue]) => {
          const colorAnswer = colorSelectedAnswer(
            answerOptionLetter,
            selectedAnswer,
            correctAnswer,
          );
          return (
            <button
              key={answerOptionLetter}
              id={answerOptionLetter}
              onClick={handleOnClick}
              className={`${colorAnswer} mb-4 flex w-full space-x-6 rounded-lg border p-5 text-left`}
            >
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-black bg-white">
                  <p className="font-bold text-black">{answerOptionLetter}</p>
                </div>
              </div>
              <p className="text-black">{answerOptionValue}</p>
            </button>
          );
        },
      )}
    </>
  );
}
