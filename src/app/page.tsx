import { db } from "~/server/db";
import Question from "~/app/question";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const questions = await db.query.questions.findMany();
  console.log(questions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {questions.map((question) => (
        <div key={question.id}>{question.question}</div>
      ))}
      <Question />
      <p>Hello</p>
    </main>
  );
}
