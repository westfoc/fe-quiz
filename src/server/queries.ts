"use server";

import { db } from "./db";
import { QuestionList } from "./db/schema";

export async function getQuestions() {
  //   const user = auth();

  //   if (!user.userId) throw new Error("Unauthorized");

  const questions = await db.query.questionList.findMany({
    with: {
      answers: true,
    },
  });

  return questions;
}
