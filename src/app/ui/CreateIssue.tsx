"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useFormik } from "formik";

export const CreateIssue = ({ forceUpdate }: { forceUpdate: () => void }) => {
  const formik = useFormik({
    initialValues: {
      parentIssueId: "",
      status: "",
      description: "",
      link: "",
    },
    onSubmit: (values) => {
      fetch("/api/issues", {
        method: "POST",
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          forceUpdate();
          formik.resetForm();
        }
      });
    },
  });

  return (
    <Card className="mb-2">
      <div className="flex gap-4">
        <Input
          placeholder="parentIssueId"
          value={formik.values.parentIssueId}
          onChange={(e) =>
            formik.setFieldValue("parentIssueId", e.target.value)
          }
        ></Input>
        <Input
          placeholder="status"
          value={formik.values.status}
          onChange={(e) => formik.setFieldValue("status", e.target.value)}
        ></Input>
        <Input
          placeholder="description"
          value={formik.values.description}
          onChange={(e) => formik.setFieldValue("description", e.target.value)}
        ></Input>
        <Input
          placeholder="link"
          value={formik.values.link}
          onChange={(e) => formik.setFieldValue("link", e.target.value)}
        ></Input>
        <div>
          <Button
            fullWidth={false}
            size="md"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Create Issue
          </Button>
        </div>
      </div>
    </Card>
  );
};
