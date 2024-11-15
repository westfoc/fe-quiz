// import { type NextPage } from "next";
// import PageLayout from "~/app/layout";
"use server";
import { Question } from "~/app/_components/question";
import { getQuestions } from "~/server/queries";

export async function QuestionWrapper() {
  const data = await getQuestions();

  return (
    <>
      <Question data={data} />
    </>
  );
}

export default QuestionWrapper;
