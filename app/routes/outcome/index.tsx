import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Outcome } from "~/models/outcome.server";
import { getOutcomeListItems } from "~/models/outcome.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  outcomeListItems: Outcome[];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const outcomeListItems = await getOutcomeListItems({ userId });
  return json({ outcomeListItems });
};
export default function OutcomeIndexPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      {data.outcomeListItems.length === 0 ? (
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
