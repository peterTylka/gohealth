import { useCallback, useState } from "react";

const emptyErrorMessage = "";
const getDefaultErrorMessage = (issueId: string) =>
  `Failed to delete issue ${issueId}`;

export const useDeleteIssue = (
  forceUpdate: () => void,
  afterDelete?: () => void
) => {
  const [errorMessage, setErrorMessage] = useState("");

  const deleteIssue = useCallback(
    async (issueId: string) => {
      if (!issueId) {
        return "Missing issueId";
      }

      try {
        const response = await fetch(`/api/issues/${issueId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setErrorMessage(emptyErrorMessage);
          afterDelete?.();
          forceUpdate();
        } else {
          const serverError = await response.json();
          setErrorMessage(
            serverError?.error
              ? serverError?.error
              : getDefaultErrorMessage(issueId)
          );
        }
      } catch {
        setErrorMessage(getDefaultErrorMessage(issueId));
      }
    },
    [forceUpdate, afterDelete]
  );

  return { errorMessage, deleteIssue };
};
