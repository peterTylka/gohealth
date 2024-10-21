// typeof usersTable.$inferInsert

import { IssueDbHandler, IssueType } from "@/app/types";
import { db } from "@/db";
import { issuesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

async function createIssue(
  partialIssue: Omit<IssueType, "id" | "creationTimestamp">
): Promise<{
  issue: Required<IssueType>;
  error?: string;
}> {
  // add Id + creationTimestamp
  const issue: Required<IssueType> = {
    ...partialIssue,
    id: uuidv4(),
    creationTimestamp: new Date().toISOString(),
    parentIssueId: partialIssue.parentIssueId ? partialIssue.parentIssueId : "",
  };

  let error = "";
  try {
    await db.insert(issuesTable).values(issue).returning();
  } catch {
    error = "Failed to create issue";
  }
  return { issue, ...(error ? { error } : {}) };
}

async function readAllIssues(): Promise<{
  issues: Required<IssueType>[];
  error?: string;
}> {
  let issues: Required<IssueType>[] = [];
  try {
    issues = await db.select().from(issuesTable);
  } catch {
    return { issues, error: "Failed to read issues." };
  }

  return { issues };
}

async function deleteIssue(issueId: string): Promise<{
  error?: string;
}> {
  let error = {};
  try {
    const response = await db
      .delete(issuesTable)
      .where(eq(issuesTable.id, issueId));
    if (!response.rowCount) {
      error = { error: `Issue ${issueId} was not found` };
    }
  } catch {
    error = { error: `Failed to delete issue ${issueId}` };
  }

  return error;
}

export const postgresDbHandler: IssueDbHandler = {
  readAllIssues,
  createIssue,
  deleteIssue,
};
