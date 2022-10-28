import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Recruitment = {
  id: string;
  code: string;
  screened: number;
  eligible: number;
  profile_id: string;
};

export async function getRecruitmentListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("recruitment")
    .select("id, code")
    .eq("profile_id", userId);

  return data;
}

export async function createRecruitment({
  code,
  screened,
  eligible,
  userId,
}: Pick<Recruitment, "screened" | "code" | "eligible"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("recruitment")
    .insert([{ code, screened, eligible, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteRecruitment({
  id,
  userId,
}: Pick<Recruitment, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("recruitment")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getRecruitment({
  id,
  userId,
}: Pick<Recruitment, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("recruitment")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      code: data.code,
      screened: data.screened,
      eligible: data.eligible,
    };
  }

  return null;
}
