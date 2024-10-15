import { csvDbHandler } from "@/app/lib/csv";

export async function DELETE(
  req: Request,
  { params: { issueid } }: { params: { issueid: string } }
) {
  if (!issueid) {
    return Response.json(
      { error: "Missing issue id in request" },
      { status: 400 }
    );
  }

  const { error } = await csvDbHandler.deleteIssue(issueid);
  const body = error ? { error } : {};
  const status = error ? 500 : 200;

  return Response.json(body, { status });
}
