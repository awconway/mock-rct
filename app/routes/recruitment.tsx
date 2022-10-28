import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Recruitment } from "~/models/recruitment.server";
import { getRecruitmentListItems } from "~/models/recruitment.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

type LoaderData = {
  recruitmentListItems: Recruitment[];
};

export async function loader ({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const recruitmentListItems = await getRecruitmentListItems({ userId });
  return json({ recruitmentListItems });
};

export default function RecruitmentPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <>
    <Header />
    <main>
      <div className="p-6">
        <Outlet />
      </div>
      <div className="border-t bg-gray-50">
        {data.recruitmentListItems.length === 0 ? (
          <Link to="new" className="block p-4 text-xl text-blue-500">

          </Link>
        ) : (
          <ol>
            {data.recruitmentListItems.map((recruitment) => (
              <li key={recruitment.id}>
                <NavLink
                  className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                  }
                  to={recruitment.id}
                >
                  📝 {recruitment.code}
                </NavLink>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  </>
  );
}

function Header() {
  const user = useUser();
  return (
    <header className="flex items-center justify-between bg-blue-800 p-4 text-white">
      <h1 className="text-3xl font-bold">
        <Link to="/">Home</Link>
      </h1>
      <p>{user.email}</p>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-blue-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </header>
  );
}