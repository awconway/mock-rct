import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Intervention } from "~/models/intervention.server";
import { deleteIntervention, getIntervention} from "~/models/intervention.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  intervention: Intervention;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.interventionId, "interventionId not found");

  const intervention = await getIntervention({ userId, id: params.interventionId });
  if (!intervention) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ intervention });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.interventionId, "interventionId not found");

  await deleteIntervention({ userId, id: params.interventionId });

  return redirect("/intervention");
};

export default function InterventionDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <p className="py-6">Randomization code: {data.intervention.code}</p>
      <p className="py-6">Intervention received: {data.intervention.interventionForm}</p>
      <p className="py-6">Blinding maintained: {data.intervention.blinding}</p>
      <hr className="my-4" />
      <Form method="post" reloadDocument>
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
