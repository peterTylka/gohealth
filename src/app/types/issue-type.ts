export interface IssueType {
  description: string;
  link: string;
  status: "Closed" | "Open";
  parentIssueId?: string;
  id?: string;
  creationTimestamp?: string;
}
export type PostCreateIssueRequest = Omit<
  IssueType,
  "id" | "creationTimestamp"
>;
export type GetIssuesListResponse = Required<IssueType>[];
