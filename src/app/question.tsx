"use client";
import { useState } from "react";
import { type NextPage } from "next";

// import { api } from "~/utils/api";
import LoadingPage from "~/app/loading";
import PageLayout from "~/app/layout";

const AnswerOption = (props: {
  answerOption: { [key: string]: string };
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedAnswer: string;
  correctAnswer: string;
}) => {
  const colorSelectedAnswer = (
    answer: string,
    selectedAnswer: string,
    correctAnswer: string,
  ) => {
    if (answer === selectedAnswer && selectedAnswer === correctAnswer) {
      return "bg-green-400 border-green-500 hover:bg-green-400";
    }
    if (answer === selectedAnswer && selectedAnswer !== correctAnswer) {
      return "bg-red-400 border-red-600 hover:bg-red-400";
    }

    return "bg-white hover:bg-slate-300";
  };
  const { answerOption, handleOnClick, selectedAnswer, correctAnswer } = props;
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
};

const incrementQuestionIdx = (
  currentQuestionIdx: number,
  setCurrentQuestionIdx: React.Dispatch<React.SetStateAction<number>>,
) => setCurrentQuestionIdx(currentQuestionIdx + 1);

const Question = () => {
  const isLoading = false;
  //   const { data } = api.questions.getAll.useQuery();
  const data = [
    {
      id: 1,
      question: "What' your question",
      answerOptions: {
        A: "Answer A",
        B: "Answer B",
        C: "Answer C",
        D: "Answer D",
      },
      correctAnswer: "This is the answer",
      answerExplanation: "Here's the explanation",
    },
  ];
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

  if (isLoading)
    return (
      <div className="flex grow">
        <LoadingPage />{" "}
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <div key={data?.[currentQuestionIdx]?.id}>
        <h2 className="text-l pb-8 pt-8">
          {data?.[currentQuestionIdx]?.question}
        </h2>
        <ul className="divide-slate-100">
          <li>
            <AnswerOption
              answerOption={{
                A: data[currentQuestionIdx]?.answerOptions.A || "",
              }}
              selectedAnswer={selectedAnswer}
              handleOnClick={handleSelectAnswer}
              correctAnswer={data?.[currentQuestionIdx]?.correctAnswer || ""}
            />
          </li>
          <li>
            <AnswerOption
              answerOption={{
                B: data[currentQuestionIdx]?.answerOptions.B || "",
              }}
              selectedAnswer={selectedAnswer}
              handleOnClick={handleSelectAnswer}
              correctAnswer={data?.[currentQuestionIdx]?.correctAnswer || ""}
            />
          </li>
          <li>
            <AnswerOption
              answerOption={{
                C: data[currentQuestionIdx]?.answerOptions.C || "",
              }}
              selectedAnswer={selectedAnswer}
              handleOnClick={handleSelectAnswer}
              correctAnswer={data?.[currentQuestionIdx]?.correctAnswer || ""}
            />
          </li>
          <li>
            <AnswerOption
              answerOption={{
                D: data[currentQuestionIdx]?.answerOptions.D || "",
              }}
              selectedAnswer={selectedAnswer}
              handleOnClick={handleSelectAnswer}
              correctAnswer={data?.[currentQuestionIdx]?.correctAnswer || ""}
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
                data[currentQuestionIdx]?.correctAnswer || ""
              }.
                    ${data[currentQuestionIdx]?.answerExplanation || ""}`}
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
};

const Home: NextPage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col p-4">
        <Question />
      </div>
    </PageLayout>
  );
};

export default Home;
