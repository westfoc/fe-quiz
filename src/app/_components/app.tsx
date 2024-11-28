"use server";

import { getQuestions } from "~/server/queries";
import QuestionWrapper from "./question-wrapper";

export async function App() {
  const data = await getQuestions();

  return (
    <div className="w-10/12 max-w-screen-sm">
      <QuestionWrapper data={data} />
    </div>
  );
}

export default App;
