import { IssueType, PostCreateIssueRequest } from "./issue-type";

export interface IssueDbHandler {
  readAllIssues: () => Promise<Required<IssueType>[]>;
  createIssue: (
    partialIssue: PostCreateIssueRequest
  ) => Promise<Required<IssueType>>;
  deleteIssue: (issueId: string) => void;
}
