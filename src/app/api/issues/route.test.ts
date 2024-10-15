/**
 * @jest-environment node
 */
import { expect, it } from "@jest/globals";
import { describe } from "node:test";
import { GET, POST } from "./route";

describe("API requests", () => {
  describe("GET All issues", () => {
    it("should return 200", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
      expect(Array.isArray(body?.issues)).toBeTruthy();
    });
  });

  describe("POST create new issue", () => {
    it("should return 201 on success", async () => {
    const newIssue = {
      description: "Customer 360 Job is not ingesting into Search Engine",
      parentIssueId: "",
      status: "Closed",
      link: "yahoo.com",
    };
    const request = new Request("http://localhost:3000/api/issues", {
      method: "POST",
      body: JSON.stringify(newIssue),
    });
    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual(
      expect.objectContaining({
        issue: {
          ...newIssue,
          id: expect.any(String),
          creationTimestamp: expect.any(String),
        },
      })
    );
    });

    it("should return 400 on missing issue field", async () => {
      const request = new Request("http://localhost:3000/api/issues", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({ error: "Missing issue fields in request" });
    });
  });
  });
});
