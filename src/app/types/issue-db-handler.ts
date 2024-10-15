import { IssueType, PostCreateIssueRequest } from "./issue-type";

export interface IssueDbHandler {
  readAllIssues: () => Promise<{
    issues: Required<IssueType>[];
    error?: string;
  }>;
  createIssue: (partialIssue: PostCreateIssueRequest) => Promise<{
    issue: Required<IssueType>;
    error?: string;
  }>;
  deleteIssue: (issueId: string) => Promise<{
    error?: string;
  }>;
}
