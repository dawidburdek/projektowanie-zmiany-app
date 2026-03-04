export type ProjectStatus = "New" | "In Progress" | "Completed";
export type QueryStatus = "New" | "In Progress" | "Resolved";

export interface Project {
  id: string;
  created_at: string;
  name: string;
  status: ProjectStatus;
  owner_id: string;
  visibility: "all" | "admin_only";
}

export interface Query {
  id: string;
  created_at: string;
  project_id: string;
  name: string;
  description: string | null;
  image_paths: string[];
  status: QueryStatus;
  created_by: string;
  visibility: "all" | "admin_only";
}

export interface Message {
  id: string;
  created_at: string;
  query_id: string;
  user_id: string;
  content: string | null;
  image_paths: string[];
  user_email: string;
}
