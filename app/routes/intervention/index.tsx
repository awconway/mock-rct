import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Intervention } from "~/models/intervention.server";
import { getInterventionListItems } from "~/models/intervention.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  interventionListItems: Intervention[];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const interventionListItems = await getInterventionListItems({ userId });
  return json({ interventionListItems });
};
export default function InterventionIndexPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      {data.interventionListItems.length === 0 ? (
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
