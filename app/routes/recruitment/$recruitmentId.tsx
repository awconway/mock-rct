import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Recruitment } from "~/models/recruitment.server";
import { deleteRecruitment, getRecruitment } from "~/models/recruitment.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  recruitment: Recruitment;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.recruitmentId, "recruitmentId not found");

  const recruitment = await getRecruitment({ userId, id: params.recruitmentId });
  if (!recruitment) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ recruitment });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.recruitmentId, "recruitmentId not found");

  await deleteRecruitment({ userId, id: params.recruitmentId });

  return redirect("/recruitment");
};

export default function RecruitmentDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">Randomization code: {data.recruitment.code}</h3>
      <p className="py-6">Number screened: {data.recruitment.screened}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
