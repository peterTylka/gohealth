"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useDeleteIssue } from "../hooks";

export const DeleteIssue = ({ forceUpdate }: { forceUpdate: () => void }) => {
  const [issueId, setIssueId] = useState("");
  const afterDelete = useCallback(() => {
    setIssueId("");
  }, [setIssueId]);
  const { errorMessage, deleteIssue } = useDeleteIssue(
    forceUpdate,
    afterDelete
  );

  return (
    <Card className="mb-2">
      <div className="flex gap-4">
        <Input
          placeholder="please enter issue id to delete"
          value={issueId}
          onChange={(e) => setIssueId(e.target.value)}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />
        <div>
          <Button
            fullWidth={false}
            disabled={!issueId}
            size="md"
            onClick={() => {
              deleteIssue(issueId);
            }}
          >
            Delete Issue
          </Button>
        </div>
      </div>
    </Card>
  );
};
