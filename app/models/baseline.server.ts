import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Baseline = {
  id: string;
  code: string;
  happy: number;
  smarties: number; 
  profile_id: string;
};

export async function getBaselineListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("baseline")
    .select("id, code")
    .eq("profile_id", userId);

  return data;
}

export async function createBaseline({
  code,
  happy,
  smarties,
  userId,
}: Pick<Baseline, "happy" | "smarties" | "code"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("baseline")
    .insert([{ code, happy, smarties, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteBaseline({
  id,
  userId,
}: Pick<Baseline, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("baseline")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getBaseline({
  id,
  userId,
}: Pick<Baseline, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("baseline")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      code: data.code,
      happy: data.happy,
      smarties: data.smarties,
    };
  }

  return null;
}
