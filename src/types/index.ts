export interface Question {
  id: number | string;
  createdAt: Date;
  questionString: string | null;
  codeSnippet: string | null;
  correctAnswer: string | null;
  answerExplanation: string | null;
  category: string | null;
  answers: Record<string, string | number | Date | null>;
}

export interface QuestionProps {
  data: Question[];
}

export enum Category {
  JAVASCRIPT = "js",
  "HTML/CSS" = "html/css",
  ALGORITHMS = "algorithms",
  DATA_STRUCTURES = "data_structures",
  SYSTEM_DESIGN = "system_design",
}
