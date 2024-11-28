import type { AnswerType } from "~/types";

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
  function colorSelectedAnswer(
    answerLetter: string,
    selectedAnswerLetter: string,
    correctAnswerLetter: string,
  ) {
    if (
      answerLetter === selectedAnswerLetter &&
      selectedAnswerLetter === correctAnswerLetter
    ) {
      return "bg-green-400 border-green-500 hover:bg-green-400";
    }
    if (
      answerLetter === selectedAnswerLetter &&
      selectedAnswerLetter !== correctAnswerLetter
    ) {
      return "bg-red-400 border-red-600 hover:bg-red-400";
    }

    return "bg-white hover:bg-slate-300";
  }
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
