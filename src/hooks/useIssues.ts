import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Issue, IssueFilters, IssueSort } from "@/types/issue";
import { IssueFormData } from "@/lib/schemas/issueSchema";

const ISSUES_QUERY_KEY = "issues";

interface FetchIssuesOptions {
  filters?: IssueFilters;
  sort?: IssueSort;
}

async function fetchIssues({ filters, sort }: FetchIssuesOptions = {}) {
  const params = new URLSearchParams();

  // Add filters to query params
  if (filters) {
    if (filters.propertyId) params.set("propertyId", filters.propertyId);
    if (filters.status) params.set("status", filters.status);
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.type) params.set("type", filters.type);
    if (filters.dueDateGte) params.set("dueDateGte", filters.dueDateGte.toISOString());
    if (filters.dueDateLte) params.set("dueDateLte", filters.dueDateLte.toISOString());
  }

  // Add sort to query params
  if (sort) {
    params.set("sortBy", sort.field);
    params.set("sortOrder", sort.order);
  }

  const response = await fetch(`/api/issues?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch issues");
  }
  return response.json() as Promise<Issue[]>;
}

async function createIssue(data: IssueFormData) {
  const response = await fetch("/api/issues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create issue");
  }

  return response.json() as Promise<Issue>;
}

export function useIssues(options: FetchIssuesOptions = {}) {
  return useQuery({
    queryKey: [ISSUES_QUERY_KEY, options],
    queryFn: () => fetchIssues(options),
  });
}

export function useCreateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ISSUES_QUERY_KEY] });
    },
  });
} 