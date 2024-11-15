export default function AnswerOption(props: {
  answerOption: { [key: string]: string };
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedAnswer: string;
  correctAnswer: string;
}) {
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
}
