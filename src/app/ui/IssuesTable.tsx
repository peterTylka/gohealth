import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { COLUMNS } from "../constants";
import { IssueType } from "../types";

export const IssuesTable = ({ issues }: { issues: Required<IssueType>[] }) => {
  return (
    <Table aria-label="Issues table" isStriped>
      <TableHeader>
        {COLUMNS.map((headerItem) => (
          <TableColumn key={headerItem}>{headerItem}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {issues?.map((issue) => (
          <TableRow key={issue.id}>
            {COLUMNS.map((column) => (
              <TableCell key={column}>
                {issue[column as keyof IssueType]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
