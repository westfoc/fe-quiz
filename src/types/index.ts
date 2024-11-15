export interface Question {
  id: number;
  createdAt: Date;
  questionString: string | null;
  codeSnippet: string | null;
  correctAnswer: string | null;
  answerExplanation: string | null;
  category:
    | "js"
    | "html/css"
    | "data_structures"
    | "algorithms"
    | "systems_design"
    | null;
  answers: {
    A: string | null;
    B: string | null;
    C: string | null;
    D: string | null;
  };
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
