"use client";

import { createQuestion } from "~/server/queries";
import { useCallback, useState } from "react";
import type { SyntheticEvent } from "react";
import { Category } from "~/types";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import AnswerInput from "~/app/_components/answer-input";

const DEFAULT_QUESTION = "Add your question here.";
const DEFAULT_VALUE_A = "Add answer choice A here.";
const DEFAULT_VALUE_B = "Add answer choice B here.";
const DEFAULT_VALUE_C = "Add answer choice C here.";
const DEFAULT_VALUE_D = "Add answer choice D here.";
const DEFAULT_CORRECT_ANSWER = "Add the correct answer here.";
const DEFAULT_ANSWER_EXPLANATION = "Add answer explanation here";

export default function CreateQuestionPage() {
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [valueA, setValueA] = useState(DEFAULT_VALUE_A);
  const [valueB, setValueB] = useState(DEFAULT_VALUE_B);
  const [valueC, setValueC] = useState(DEFAULT_VALUE_C);
  const [valueD, setValueD] = useState(DEFAULT_VALUE_D);
  const [correctAnswer, setCorrectAnswer] = useState(DEFAULT_CORRECT_ANSWER);
  const [answerExplanation, setAnswerExplanation] = useState(
    DEFAULT_ANSWER_EXPLANATION,
  );
  const [category, setCategory] = useState(Category.JAVASCRIPT);

  async function handleOnClickSubmit() {
    const q = {
      question,
      answers: {
        A: valueA,
        B: valueB,
        C: valueC,
        D: valueD,
      },
      correctAnswer,
      answerExplanation,
      category,
      codeSnippet: "",
    };
    await createQuestion(q);
    setQuestion(DEFAULT_QUESTION);
    setValueA(DEFAULT_VALUE_A);
    setValueB(DEFAULT_VALUE_B);
    setValueC(DEFAULT_VALUE_C);
    setValueD(DEFAULT_VALUE_D);
    setCorrectAnswer(DEFAULT_CORRECT_ANSWER);
    setAnswerExplanation(DEFAULT_ANSWER_EXPLANATION);
  }

  const onQuestionBlur = useCallback((e: SyntheticEvent) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };

    setQuestion(sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf));
  }, []);

  const correctAnswerBlur = useCallback((e: SyntheticEvent) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };

    setCorrectAnswer(sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf));
  }, []);

  const answerExplanationBlur = useCallback((e: SyntheticEvent) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };

    setAnswerExplanation(sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf));
  }, []);

  return (
    <div className="flex w-full flex-col p-4">
      <div className="h-full w-full flex-col gap-2">
        <ContentEditable
          className="w-86 mb-7 text-xl focus-visible:outline-none"
          onChange={(e) => onQuestionBlur(e)}
          onBlur={onQuestionBlur}
          html={question}
        />
        <div className="w-full">
          <AnswerInput questionLetter="A" value={valueA} onChange={setValueA} />
          <AnswerInput questionLetter="B" value={valueB} onChange={setValueB} />
          <AnswerInput questionLetter="C" value={valueC} onChange={setValueC} />
          <AnswerInput questionLetter="D" value={valueD} onChange={setValueD} />
          <div>
            <ContentEditable
              className="w-86 mb-7 text-xl focus-visible:outline-none"
              onChange={(e) => correctAnswerBlur(e)}
              onBlur={correctAnswerBlur}
              html={correctAnswer}
            />
          </div>
          <div>
            <ContentEditable
              className="w-86 mb-7 text-xl focus-visible:outline-none"
              onChange={(e) => answerExplanationBlur(e)}
              onBlur={answerExplanationBlur}
              html={answerExplanation}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="category">Choose a category</label>
          <div>
            <select
              value={category}
              onChange={(e) =>
                setCategory(Category[e.target.value as keyof typeof Category])
              }
              className="text-black"
              id="category"
            >
              <option value={Category.JAVASCRIPT}>{Category.JAVASCRIPT}</option>
              <option value={Category["HTML/CSS"]}>
                {Category["HTML/CSS"]}
              </option>
              <option value={Category.DATA_STRUCTURES}>
                {Category.DATA_STRUCTURES}
              </option>
              <option value={Category.ALGORITHMS}>{Category.ALGORITHMS}</option>
              <option value={Category.SYSTEM_DESIGN}>
                {Category.SYSTEM_DESIGN}
              </option>
            </select>
          </div>
        </div>
        <button
          className="disabled:blue-gray-700 flex rounded-lg bg-blue-600 px-6 py-4"
          onClick={handleOnClickSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
}
