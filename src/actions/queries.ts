"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { QueryStatus } from "@/lib/types";

export async function createQuery(projectId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const imagePaths: string[] = [];
  let i = 0;
  while (true) {
    const imageFile = formData.get(`image_${i}`) as File | null;
    if (!imageFile || imageFile.size === 0) break;
    const ext = imageFile.name.split(".").pop();
    const filename = `${user.id}/${Date.now()}_${i}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("query-images")
      .upload(filename, imageFile);
    if (uploadError) return { error: uploadError.message };
    imagePaths.push(filename);
    i++;
  }

  const visibility = (formData.get("visibility") as string) || "all";
  const { error } = await supabase.from("queries").insert({
    project_id: projectId,
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || null,
    image_paths: imagePaths,
    created_by: user.id,
    visibility,
  });

  if (error) return { error: error.message };

  revalidatePath(`/projects/${projectId}`);
  redirect(`/projects/${projectId}`);
}

export async function updateQuery(queryId: string, projectId: string, formData: FormData) {
  const supabase = await createClient();

  const visibility = (formData.get("visibility") as string) || "all";
  const { error } = await supabase
    .from("queries")
    .update({
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      visibility,
    })
    .eq("id", queryId);

  if (error) return { error: error.message };

  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/projects/${projectId}/queries/${queryId}`);
  redirect(`/projects/${projectId}/queries/${queryId}`);
}

export async function updateQueryStatus(queryId: string, projectId: string, status: QueryStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("queries")
    .update({ status })
    .eq("id", queryId);

  if (error) return { error: error.message };

  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/projects/${projectId}/queries/${queryId}`);
}

export async function deleteQuery(queryId: string, projectId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("queries")
    .delete()
    .eq("id", queryId);

  if (error) return { error: error.message };

  revalidatePath(`/projects/${projectId}`);
  redirect(`/projects/${projectId}`);
}

export async function markQueryAsUnread(queryId: string, projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("query_reads").delete()
    .eq("user_id", user.id)
    .eq("query_id", queryId);

  revalidatePath(`/projects/${projectId}`);
}

export async function markQueryAsRead(queryId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("query_reads").upsert(
    { user_id: user.id, query_id: queryId, last_read_at: new Date().toISOString() },
    { onConflict: "user_id,query_id" }
  );
}

export async function sendMessage(queryId: string, projectId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const imagePaths: string[] = [];
  let i = 0;
  while (true) {
    const imageFile = formData.get(`image_${i}`) as File | null;
    if (!imageFile || imageFile.size === 0) break;
    const ext = imageFile.name.split(".").pop();
    const filename = `${user.id}/${Date.now()}_${i}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("chat-images")
      .upload(filename, imageFile);
    if (uploadError) return { error: uploadError.message };
    imagePaths.push(filename);
    i++;
  }

  const content = (formData.get("content") as string) || null;
  if (!content && imagePaths.length === 0) return { error: "Wiadomość nie może być pusta" };

  const { error } = await supabase.from("messages").insert({
    query_id: queryId,
    user_id: user.id,
    user_email: user.email!,
    content,
    image_paths: imagePaths,
  });

  if (error) return { error: error.message };

  revalidatePath(`/projects/${projectId}/queries/${queryId}`);
}
