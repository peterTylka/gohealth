import { dbhandler } from "@/app/lib/dbhandler";
import { PostCreateIssueRequest } from "@/app/types";

export async function GET() {
  const { issues, error } = await dbhandler.readAllIssues();
  const body = error ? { error } : { issues };
  const status = error ? 500 : 200;

  return Response.json(body, { status });
}

export async function POST(req: Request) {
  let partialIssue: PostCreateIssueRequest = {} as PostCreateIssueRequest;
  const response400 = Response.json(
    { error: "Missing issue fields in request" },
    { status: 400 }
  );

  try {
    partialIssue = await req.json();
  } catch {
    return response400;
  }

  if (
    !partialIssue?.description ||
    !partialIssue?.link ||
    !partialIssue?.status
  ) {
    return response400;
  }

  const { issue, error } = await dbhandler.createIssue(partialIssue);
  const body = error ? { error } : { issue };
  const status = error ? 500 : 201;

  return Response.json(body, { status });
}
