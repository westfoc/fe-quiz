"use client";

import { useState } from "react";
import type { Question, CategoryMap } from "~/types";
import MultipleChoiceQuestion from "~/app/_components/multiple-choice-question";
import Categories from "~/app/_components/categories";
import { createCategoryList, typestoFilter, filterQuestions } from "~/utils";

interface QuestionWrapperProps {
  data: Question[];
}

export default function QuestionWrapper({ data }: QuestionWrapperProps) {
  const [categories, setCategories] =
    useState<CategoryMap[]>(createCategoryList());

  const categoryFilter = typestoFilter(categories);
  const filteredQuestions =
    Object.keys(categoryFilter).length === 0
      ? data
      : filterQuestions(categoryFilter, data);

  return (
    <div>
      <Categories categoryList={categories} setCategories={setCategories} />
      <MultipleChoiceQuestion data={filteredQuestions} />
    </div>
  );
}
