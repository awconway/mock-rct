import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Outcome = {
  id: string;
  code: string;
  taste: number;
  energy: number; 
  profile_id: string;
};

export async function getOutcomeListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("outcome")
    .select("id, code")
    .eq("profile_id", userId);

  return data;
}

export async function createOutcome({
  code,
  taste,
  energy,
  userId,
}: Pick<Outcome, "taste" | "energy" | "code"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("outcome")
    .insert([{ code, taste, energy, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteOutcome({
  id,
  userId,
}: Pick<Outcome, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("outcome")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getOutcome({
  id,
  userId,
}: Pick<Outcome, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("outcome")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      code: data.code,
      taste: data.taste,
      energy: data.energy,
    };
  }

  return null;
}
