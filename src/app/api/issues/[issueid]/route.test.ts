/**
 * @jest-environment node
 */
import { expect, it } from "@jest/globals";
import { describe } from "node:test";
import { POST } from "../route";
import { DELETE } from "./route";

describe("DELETE issue", () => {
  it("should return 500 on non-existing issue", async () => {
    const response = await DELETE(
      new Request("http://localhost:3000/api/issues/abc", {
        method: "DELETE",
        body: JSON.stringify({}),
      }),
      { params: { issueid: "abc" } }
    );
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: "Issue not found" });
  });

  it("should return 204 on existing issue", async () => {
    // create issue + read its id
    const newIssue = {
      description: "Customer 360 Job is not ingesting into Search Engine",
      parentIssueId: "",
      status: "Closed",
      link: "yahoo.com",
    };
    const postResponse = await POST(
      new Request("http://localhost:3000/api/issues", {
        method: "POST",
        body: JSON.stringify(newIssue),
      })
    );
    const postBody = await postResponse.json();

    //delete issue
    const deleteResponse = await DELETE(
      new Request("http://localhost:3000/api/issues/abc", {
        method: "DELETE",
        body: JSON.stringify({}),
      }),
      { params: { issueid: postBody?.issue?.id } }
    );
    const deleteBody = await deleteResponse.json();

    expect(deleteResponse.status).toBe(200);
    expect(deleteBody).toEqual({});
  });
});
