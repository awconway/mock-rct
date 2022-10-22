import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Baseline } from "~/models/baseline.server";
import { getBaselineListItems } from "~/models/baseline.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  baselineListItems: Baseline[];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const baselineListItems = await getBaselineListItems({ userId });
  return json({ baselineListItems });
};
export default function BaselineIndexPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      {data.baselineListItems.length === 0 ? (
        <p>
          <Link to="new" className="text-blue-500 underline">
            Create a new entry.
          </Link>
        </p>) : (
        <p></p>
      )}
    </div>
  );
}
