"use client";

import { useEffect, useState } from "react";
import { useForceRender } from "./hooks";
import { IssueType } from "./types";
import { CreateIssue, DeleteIssue, IssuesTable } from "./ui";

export default function App() {
  const [issues, setIssues] = useState([] as unknown as Required<IssueType>[]);
  const { updateState, forceUpdate } = useForceRender();

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
  }, [updateState]);

  return (
    <>
      <CreateIssue forceUpdate={forceUpdate} />
      <DeleteIssue forceUpdate={forceUpdate} />
      <IssuesTable issues={issues} forceUpdate={forceUpdate} />
    </>
  );
}
