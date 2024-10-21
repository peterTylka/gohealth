import { IssueDbHandler, IssueType } from "@/app/types";
import { parse } from "csv-parse/sync";
import stringify from "csv-stringify-as-promised";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const FILEPATH = "my.csv";

async function readAllIssuesFromCsv(): Promise<{
  issues: Required<IssueType>[];
  error?: string;
}> {
  let issues: Required<IssueType>[] = [];
  try {
    const content = await fs.promises.readFile(FILEPATH);
    issues = parse(content, {
      columns: true,
      bom: true,
    });
  } catch {
    // there is a problem with csv file itself so just touch empty file
    await writeAllIssuesIntoCsv([]);
    return { issues, error: "Failed to read issues." };
  }

  return { issues };
}

async function writeAllIssuesIntoCsv(issues: Required<IssueType>[]): Promise<{
  error?: string;
}> {
  try {
    const content = await stringify(issues, { header: true, bom: true });
    fs.writeFileSync(FILEPATH, content);
    console.log(`${FILEPATH} saved.`);
    return {};
  } catch {
    console.log(`Issues were not saved to ${FILEPATH}.`);
    return { error: "Failed to save issues." };
  }
}

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
  const { issues } = await readAllIssuesFromCsv();
  issues.push(issue);
  const { error } = await writeAllIssuesIntoCsv(issues);
  return { issue, ...(error ? { error } : {}) };
}

async function deleteIssue(issueId: string): Promise<{
  error?: string;
}> {
  const defaultError = { error: `Failed to delete issue ${issueId}` };
  const { issues, error: readError } = await readAllIssuesFromCsv();
  if (issues.length < 1 || readError) {
    return defaultError;
  }

  const finalIssues = [] as Required<IssueType>[];
  let issueToDelete = null;
  issues.forEach((issue) => {
    if (issue.id === issueId) {
      issueToDelete = issue;
    } else {
      finalIssues.push(issue);
    }
  });
  if (!issueToDelete) {
    return { error: `Issue ${issueId} was not found` };
  }

  const { error: writeError } = await writeAllIssuesIntoCsv(finalIssues);
  return writeError ? defaultError : {};
}

export const csvDbHandler: IssueDbHandler = {
  readAllIssues: readAllIssuesFromCsv,
  createIssue,
  deleteIssue,
};
