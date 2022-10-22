import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Baseline } from "~/models/baseline.server";
import { deleteBaseline, getBaseline} from "~/models/baseline.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  baseline: Baseline;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.baselineId, "baselineId not found");

  const baseline = await getBaseline({ userId, id: params.baselineId });
  if (!baseline) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ baseline });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.baselineId, "baselineId not found");

  await deleteBaseline({ userId, id: params.baselineId });

  return redirect("/baseline");
};

export default function BaselineDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">Randomization code: {data.baseline.code}</h3>
      <p className="py-6">Happiness rating: {data.baseline.happy}</p>
      <p className="py-6">Smarties rating: {data.baseline.smarties}</p>
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
