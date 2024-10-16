// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";
import { COLUMNS } from "../constants";
import { IssueType } from "../types";

export const IssuesTable = ({
  issues,
  forceUpdate,
}: {
  issues: Required<IssueType>[];
  forceUpdate: () => void;
}) => {
  const deleteIssue = useCallback(
    (issueId: string) => {
      fetch(`/api/issues/${issueId}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          forceUpdate();
        }
      });
    },
    [forceUpdate]
  );

  return (
    <Table aria-label="Issues table" isStriped>
      <TableHeader>
        {COLUMNS.map((headerItem) => (
          <TableColumn key={headerItem}>{headerItem}</TableColumn>
        ))}
        <TableColumn key="additional"> </TableColumn>
      </TableHeader>
      <TableBody>
        {issues?.map((issue) => (
          <TableRow key={issue.id}>
            {COLUMNS.map((column) => (
              <TableCell key={column}>
                {issue[column as keyof IssueType]}
              </TableCell>
            ))}
            <TableCell key="additional">
              <Button
                fullWidth={false}
                size="md"
                onClick={() => {
                  deleteIssue(issue.id);
                }}
              >
                Delete Issue
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
