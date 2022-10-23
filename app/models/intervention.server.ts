import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Intervention = {
  id: string;
  code: string;
  interventionForm: string;
  blinding: string; 
  profile_id: string;
};

export async function getInterventionListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("intervention")
    .select("id, code")
    .eq("profile_id", userId);

  return data;
}

export async function createIntervention({
  code,
  interventionForm,
  blinding,
  userId,
}: Pick<Intervention, "interventionForm" | "blinding" | "code"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("intervention")
    .insert([{ code, interventionForm, blinding, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteIntervention({
  id,
  userId,
}: Pick<Intervention, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("intervention")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getIntervention({
  id,
  userId,
}: Pick<Intervention, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("intervention")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      code: data.code,
      interventionForm: data.interventionForm,
      blinding: data.blinding,
    };
  }

  return null;
}
