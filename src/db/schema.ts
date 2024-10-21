import { pgTable, text } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const issuesTable = pgTable("issues", {
  id: text().primaryKey().$defaultFn(uuidv4),
  parentIssueId: text().notNull(),
  description: text().notNull(),
  link: text().notNull(),
  status: text({ enum: ["Closed", "Open"] }).notNull(),
  creationTimestamp: text()
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
