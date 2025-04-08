"use client";

import { IssueList } from "@/components/issues/IssueList";
import { IssueForm } from "@/components/issues/IssueForm";
import { useIssues } from "@/hooks/useIssues";

interface IssuesClientProps {
  view: "list" | "form";
}

export function IssuesClient({ view }: IssuesClientProps) {
  const { data: issues, isLoading } = useIssues();

  if (view === "form") {
    return <IssueForm />;
  }

  return <IssueList issues={issues || []} isLoading={isLoading} />;
} 