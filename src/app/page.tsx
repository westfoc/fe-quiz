"use client";

import QuestionWrapper from "~/app/_components/question-wrapper";
import { getQuestions } from "~/server/queries";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <QuestionWrapper />
    </div>
  );
}
