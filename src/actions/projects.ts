"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectStatus } from "@/lib/types";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const visibility = (formData.get("visibility") as string) || "all";
  const { error } = await supabase.from("projects").insert({
    name: formData.get("name") as string,
    owner_id: user.id,
    visibility,
  });

  if (error) return { error: error.message };

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(projectId: string, formData: FormData) {
  const supabase = await createClient();

  const visibility = (formData.get("visibility") as string) || "all";
  const { error } = await supabase
    .from("projects")
    .update({ name: formData.get("name") as string, visibility })
    .eq("id", projectId);

  if (error) return { error: error.message };

  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
  redirect(`/projects/${projectId}`);
}

export async function updateProjectStatus(projectId: string, status: ProjectStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .update({ status })
    .eq("id", projectId);

  if (error) return { error: error.message };

  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) return { error: error.message };

  revalidatePath("/projects");
  redirect("/projects");
}
