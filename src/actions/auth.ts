"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  redirect("/projects");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const ALLOWED_EMAILS = ["mbalak@tabell.eu", "burdekd@gmail.com", "agata@tabell.eu"];
  const email = formData.get("email") as string;
  if (!ALLOWED_EMAILS.includes(email.toLowerCase())) {
    return { error: "Ten adres email nie ma dostępu do aplikacji." };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  redirect("/projects");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
