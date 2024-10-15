import { IssueDbHandler, IssueType } from "@/app/types";
import { parse } from "csv-parse/sync";
import stringify from "csv-stringify-as-promised";
import fs from "fs";

const FILEPATH = "my.csv";

// throws
async function readAllIssues() {
  let content: Buffer | null = null;
  try {
    content = await fs.promises.readFile(FILEPATH);
  } catch {
    // touch empty file
    await writeAllData([]);
    return [];
  }

  const records: Required<IssueType>[] = parse(content, {
    columns: true,
    bom: true,
  });
  console.log(`${FILEPATH} read. ${content}`);
  return records;
}

async function writeAllData(issues: IssueType[]) {
  try {
    const content = await stringify(issues, { header: true, bom: true });
    fs.writeFileSync(FILEPATH, content);
    console.log(`${FILEPATH} saved.`);
  } catch {
    console.log(`Issues were not saved to ${FILEPATH}.`);
  }
}

// create
async function createIssue(
  partialIssue: Omit<IssueType, "id" | "creationTimestamp">
) {
  // add Id + creationTimestamp
  let currentIssues: Required<IssueType>[] = [];
  try {
    currentIssues = await readAllIssues();
  } catch {}
  const issue: Required<IssueType> = {
    ...partialIssue,
    id: "NEW",
    creationTimestamp: new Date().toISOString(),
    parentIssueId: partialIssue.parentIssueId ? partialIssue.parentIssueId : "",
  };
  currentIssues.push(issue);
  await writeAllData(currentIssues);
  return issue;
}

//delete
async function deleteIssue(issueId: string) {
  const currentIssues = await readAllIssues();
  const finalIssues = currentIssues.filter((issue) => issue.id !== issueId);
  await writeAllData(finalIssues);
}

export const csvDbHandler: IssueDbHandler = {
  readAllIssues,
  createIssue,
  deleteIssue,
};
