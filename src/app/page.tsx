"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IssueType } from "./types";

const columns = [
  "id",
  "parentIssueId",
  "status",
  "description",
  "link",
  "creationTimestamp",
];

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
    <Table aria-label="Issues table">
      <TableHeader>
        {columns.map((headerItem) => (
          <TableColumn key={headerItem}>{headerItem}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {issues?.map((issue) => (
          <TableRow key={issue.id}>
            {columns.map((column) => (
              <TableCell key={column}>
                {issue[column as keyof IssueType]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
