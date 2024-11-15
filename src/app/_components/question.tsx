"use client";

import { useState } from "react";
import AnswerOption from "~/app/_components/answer-option";
import type { QuestionProps } from "~/types";

const incrementQuestionIdx = (
  currentQuestionIdx: number,
  setCurrentQuestionIdx: React.Dispatch<React.SetStateAction<number>>,
) => setCurrentQuestionIdx(currentQuestionIdx + 1);

export function Question({ data }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const handleSelectAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!e.currentTarget) {
      return;
    }
    if (!selectedAnswer) {
      setSelectedAnswer(e.currentTarget.id);
    }
  };

  const handleOnClickNext = () => {
    setSelectedAnswer("");
    incrementQuestionIdx(currentQuestionIdx, setCurrentQuestionIdx);
  };

  // const { data } = api.questions.getAll.useQuery();
  // if (isLoading)
  //   return (
  //     <div className="flex grow">
  //       <LoadingPage />{" "}
  //     </div>
  //   );

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <div key={data?.[currentQuestionIdx]?.id}>
        <h2 className="text-l pb-8 pt-8">
          {data?.[currentQuestionIdx]?.questionString}
        </h2>
        <ul className="divide-slate-100">
          <li>
            <AnswerOption
              answerOption={{
                A: data[currentQuestionIdx]?.answers.A ?? "",
              }}
              selectedAnswer={selectedAnswer}
              handleOnClick={handleSelectAnswer}
              correctAnswer={data?.[currentQuestionIdx]?.correctAnswer ?? ""}
            />
          </li>
          <li>
            <AnswerOption
              answerOption={{
                B: data[currentQuestionIdx]?.answers.B ?? "",
              }}
              selectedAnswer={selectedAnswer}
              handleOnClick={handleSelectAnswer}
              correctAnswer={data?.[currentQuestionIdx]?.correctAnswer ?? ""}
            />
          </li>
          <li>
            <AnswerOption
              answerOption={{
                C: data[currentQuestionIdx]?.answers.C ?? "",
              }}
              selectedAnswer={selectedAnswer}
              handleOnClick={handleSelectAnswer}
              correctAnswer={data?.[currentQuestionIdx]?.correctAnswer ?? ""}
            />
          </li>
          <li>
            <AnswerOption
              answerOption={{
                D: data[currentQuestionIdx]?.answers.D ?? "",
              }}
              selectedAnswer={selectedAnswer}
              handleOnClick={handleSelectAnswer}
              correctAnswer={data?.[currentQuestionIdx]?.correctAnswer ?? ""}
            />
          </li>
        </ul>
      </div>
      {selectedAnswer ? (
        <div className="flex flex-col gap-4">
          {selectedAnswer === data?.[currentQuestionIdx]?.correctAnswer ? (
            <p>Correct: Good Job</p>
          ) : (
            <p>
              {`Incorrect: The correct answer is ${
                data[currentQuestionIdx]?.correctAnswer ?? ""
              }.
                    ${data[currentQuestionIdx]?.answerExplanation ?? ""}`}
            </p>
          )}
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
