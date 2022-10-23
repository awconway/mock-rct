import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createOutcome } from "~/models/outcome.server";
import { requireUserId } from "~/session.server";
import Radio from "../../radioButtons"
export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const code = formData.get("code");
  const taste = formData.get("taste");
  const energy = formData.get("energy");
  const codes = ["tz3e", "9v0m", "70i1", "l2z9", "qms3", "xfak", "h6vq", "hmo1", "rdee", "nnbz", "ttm2", "qspi", "yf1h", "nhoz", "uys3", "tfwd", "36l7", "td3n", "80pb", "bhml", "b8ew", "j67k", "3cle", "6ihx", "oaab", "nooa", "bd99", "mnsf", "w9t3", "tliq", "7fxs", "bc06", "o4o9", "3yvh", "hyzr", "kk87", "b6i0", "ny3y", "2qby", "ayp7", "t1ng", "4r4i", "35fb", "53fz", "kwxw", "ltiy", "o1x0", "6039", "6pvi", "koe1"]
  if (typeof code !== "string" || code.length === 0 || codes.includes(code) === false || codes.includes(code) === false) {
    return json({ errors: { code: "Check if the randomization code matches the code you have been assigned" } }, { status: 400 });
  }
  if (typeof taste !== "string") {
    return json({ errors: { taste: "You need to choose a number between 1 and 10 for both questions" } }, { status: 400 });
  }
  if (typeof energy !== "string") {
    return json({ errors: { taste: "You need to choose a number between 1 and 10 for both questions" } }, { status: 400 });
  }

  const outcome = await createOutcome({ code, taste, energy, userId });
  return redirect(`/outcome/${outcome.id}`);
};

export default function NewOutcomePage() {
  const actionData = useActionData();

  return (
    <>
      <Form
        reloadDocument
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <div>
            <h2 className="text-sm font-medium">Randomization code</h2>
          <input
            name="code"
            required
            maxLength={4}
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </div>
        <Radio name="taste" label="How tasty were the smarties on a scale of 0 = 'worst thing I have ever tasted' to 10 = 'unbelievably good'?" options={[1,2,3,4,5,6,7,8,9,10]}/>
        <Radio name="energy" label="How energized on a scale of 0 = 'literally falling asleep' to 10 = 'I could run a marathon right now' do you feel right now?" options={[1,2,3,4,5,6,7,8,9,10]}/>
        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save
          </button>
        </div>
        {actionData?.errors.code ? (
          <p style={{ color: "red" }}>
            {actionData.errors.code}
          </p>
        ) : null}
        {actionData?.errors.taste ? (
          <p style={{ color: "red" }}>
            {actionData.errors.taste}
          </p>
        ) : null}
        {actionData?.errors.energy ? (
          <p style={{ color: "red" }}>
            {actionData.errors.energy}
          </p>
        ) : null}
      </Form>
    </>
  );
}
