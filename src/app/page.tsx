"use client";

import { useEffect, useState } from "react";
import { IssueType } from "./types";
import { CreateIssue } from "./ui/CreateIssue";
import { IssuesTable } from "./ui/IssuesTable";

export default function App() {
  const [issues, setIssues] = useState([] as unknown as Required<IssueType>[]);

  useEffect(() => {
    async function getAllIssues() {
      try {
        const response = await fetch("/api/issues");
        if (response.ok) {
          const json = await response.json();
          if (json?.issues) {
            setIssues(json.issues);
          }
        }
      } catch {}
    }
    getAllIssues();
  }, []);

  return (
    <>
      <CreateIssue />
      <IssuesTable issues={issues} />
    </>
  );
}
