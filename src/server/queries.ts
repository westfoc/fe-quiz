"use server";

import { db } from "./db";
import { questionList, answerOptions } from "~/server/db/schema";
import type { Category } from "~/types";
import { shuffle } from "~/utils";

export async function getQuestions() {
  //   const user = auth();

  //   if (!user.userId) throw new Error("Unauthorized");

  const questions = await db.query.questionList.findMany({
    with: {
      answers: true,
    },
  });

  return shuffle(questions);
}

export async function createQuestion(question: {
  question: string;
  answers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  answerExplanation: string;
  category: Category;
  codeSnippet: string;
}) {
  const {
    question: questionString,
    correctAnswer,
    answerExplanation,
    category,
    codeSnippet,
    answers: { A, B, C, D },
  } = question;
  const newQuestionList = await db
    .insert(questionList)
    .values({
      questionString,
      correctAnswer,
      answerExplanation,
      category,
      codeSnippet,
    })
    .returning({ answerOptionId: questionList.id });

  await db
    .insert(answerOptions)
    .values({
      answerOptionId: newQuestionList?.[0]?.answerOptionId,
      A,
      B,
      C,
      D,
    })
    .execute();
}
