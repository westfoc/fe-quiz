"use client";

import { useState } from "react";
import AnswerOption from "~/app/_components/answer-option";
import Answer from "~/app/_components/answer";
import { transformAnswers, incrementQuestionIdx } from "~/utils";
import type { Question } from "~/types";

export const dynamic = "force-dynamic";

export interface QuestionProps {
  data: Question[];
}

export default function MultipleChoiceQuestion({ data }: QuestionProps) {
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

  const transformedAnswers = transformAnswers(data, currentQuestionIdx);

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <div key={data?.[currentQuestionIdx]?.id}>
        <h2 className="text-l pb-8 pt-8">
          {data?.[currentQuestionIdx]?.questionString}
        </h2>
        <ul className="divide-slate-100">
          {transformedAnswers.map((item) => (
            <li key={String(data?.[currentQuestionIdx]?.answers?.[item])}>
              <AnswerOption
                answerOption={{
                  [item]:
                    String(data[currentQuestionIdx]?.answers?.[item]) ?? "",
                }}
                selectedAnswer={selectedAnswer}
                handleOnClick={handleSelectAnswer}
                correctAnswer={data?.[currentQuestionIdx]?.correctAnswer ?? ""}
              />
            </li>
          ))}
        </ul>
      </div>
      <Answer
        selectedAnswer={selectedAnswer}
        data={data}
        currentQuestionIdx={currentQuestionIdx}
        handleOnClickNext={handleOnClickNext}
      />
    </>
  );
}
