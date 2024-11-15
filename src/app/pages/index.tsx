import { useState } from "react";
import { type NextPage } from "next";
import PageLayout from "~/app/layout";
import { Question } from "~/app/_components/question";

const incrementQuestionIdx = (
  currentQuestionIdx: number,
  setCurrentQuestionIdx: React.Dispatch<React.SetStateAction<number>>,
) => setCurrentQuestionIdx(currentQuestionIdx + 1);

function QuestionWrapper() {
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

  return (
    <>
      <Question
        currentQuestionIdx={currentQuestionIdx}
        selectedAnswer={selectedAnswer}
        handleSelectAnswer={handleSelectAnswer}
        handleOnClickNext={handleOnClickNext}
      />
    </>
  );
}

const Home: NextPage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col p-4">
        <QuestionWrapper />
      </div>
    </PageLayout>
  );
};

export default Home;
