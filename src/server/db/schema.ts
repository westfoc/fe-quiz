// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { sql, relations } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fe-quiz_${name}`);

export const questionList = createTable("question_list", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  questionString: varchar("question", { length: 256 }),
  codeSnippet: varchar("code_snippet", { length: 256 }),
  correctAnswer: varchar("correct_answer", { length: 256 }),
  answerExplanation: varchar("answer_explanation", { length: 256 }),
  category: varchar("category", { length: 256 }),
});

export const answerOptions = createTable("answer_options", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  answerOptionId: integer("answer_option_id").references(() => questionList.id),
  A: varchar("A", { length: 256 }),
  B: varchar("B", { length: 256 }),
  C: varchar("C", { length: 256 }),
  D: varchar("D", { length: 256 }),
});

export const questionsRelations = relations(questionList, ({ one }) => ({
  answers: one(answerOptions, {
    fields: [questionList.id],
    references: [answerOptions.answerOptionId],
  }),
}));
