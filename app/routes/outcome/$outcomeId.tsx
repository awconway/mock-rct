import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Outcome } from "~/models/outcome.server";
import { deleteOutcome, getOutcome} from "~/models/outcome.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  outcome: Outcome;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.outcomeId, "outcomeId not found");

  const outcome = await getOutcome({ userId, id: params.outcomeId });
  if (!outcome) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ outcome });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.outcomeId, "outcomeId not found");

  await deleteOutcome({ userId, id: params.outcomeId });

  return redirect("/outcome");
};

export default function OutcomeDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <p className="py-6">Randomization code: {data.outcome.code}</p>
      <p className="py-6">Taste rating: {data.outcome.taste}</p>
      <p className="py-6">Energy rating: {data.outcome.energy}</p>
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
