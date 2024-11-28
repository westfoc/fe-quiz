import type { CategoryMap, Question } from "~/types";
import { Category } from "~/types";

export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const v = arr[i];
    const v2 = arr[j];
    if (v != null && v2 != null) {
      const temp = v;
      arr[i] = v2;
      arr[j] = temp;
    }
  }
  return arr;
}

export const categoryMapper: Record<string, string> = {
  JAVASCRIPT: "JavaScript",
  "HTML/CSS": "HTML/CSS",
  DATA_STRUCTURES: "Data Structures",
  ALGORITHMS: "Algorithms",
  SYSTEM_DESIGN: "System Design",
};

export const categoryMapperBack: Record<string, string> = {
  JavaScript: "js",
  "HTML/CSS": "html/css",
  "Data Structures": "data_structures",
  Algorithms: "algorithms",
  "System Design": "system_design",
};

export function createCategoryList() {
  return Object.keys(Category).map((categoryStr) => {
    return {
      name: categoryMapper[categoryStr] ?? "",
      isSelected: false,
    };
  });
}

export function typestoFilter(categories: CategoryMap[]) {
  const typesToFilter = categories.reduce((acc, category) => {
    if (category.isSelected) {
      const name = category.name;
      const dbName = categoryMapperBack[name] ?? "";
      return { ...acc, [dbName]: true };
    }
    return acc;
  }, {});
  return typesToFilter;
}

export function filterQuestions(
  categoryFilter: Record<string, boolean>,
  questions: Question[],
) {
  return questions.filter(
    (question) => question.category && question.category in categoryFilter,
  );
}

export function transformAnswers(data: Question[], currentQuestionIdx: number) {
  return Object.keys(data?.[currentQuestionIdx]?.answers ?? {}).filter(
    (item) => /^[a-z]/i.exec(item) && item.length === 1,
  );
}

export const incrementQuestionIdx = (
  currentQuestionIdx: number,
  setCurrentQuestionIdx: React.Dispatch<React.SetStateAction<number>>,
) => setCurrentQuestionIdx(currentQuestionIdx + 1);

export function formatResponse(
  selectedAnswer: string,
  data: Question[],
  currentQuestionIdx: number,
) {
  return selectedAnswer === data?.[currentQuestionIdx]?.correctAnswer
    ? "Correct: Good Job"
    : `Incorrect: The correct answer is ${data[currentQuestionIdx]?.correctAnswer ?? ""} ${data[currentQuestionIdx]?.answerExplanation ?? ""}`;
}

export function mapSelectedValues(
  categoryList: CategoryMap[],
  category: CategoryMap,
) {
  return categoryList.map((cat) => {
    return {
      ...cat,
      isSelected: cat.name === category.name ? !cat.isSelected : cat.isSelected,
    };
  });
}
