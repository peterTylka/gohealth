import { csvDbHandler } from "@/app/lib/csv";
import { PostCreateIssueRequest } from "@/app/types";

export async function GET() {
  let body = {};
  let status = 200;
  try {
    body = await csvDbHandler.readAllIssues();
    console.log(JSON.stringify(body));
  } catch {
    body = { error: "Failed to get issues" };
    status = 500;
  }
  return Response.json(body, { status });
}

export async function POST(req: Request) {
  const partialIssue: PostCreateIssueRequest = await req.json();
  const newIssue = await csvDbHandler.createIssue(partialIssue);
  return Response.json({ issue: newIssue }, { status: 201 });
}
