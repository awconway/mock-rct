import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createIntervention } from "~/models/intervention.server";
import { requireUserId } from "~/session.server";
import Radio from "../../radioButtons"
export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const code = formData.get("code");
  const interventionForm = formData.get("interventionForm");
  const blinding = formData.get("blinding");
  const codes = ["tz3e", "9v0m", "70i1", "l2z9", "qms3", "xfak", "h6vq", "hmo1", "rdee", "nnbz", "ttm2", "qspi", "yf1h", "nhoz", "uys3", "tfwd", "36l7", "td3n", "80pb", "bhml", "b8ew", "j67k", "3cle", "6ihx", "oaab", "nooa", "bd99", "mnsf", "w9t3", "tliq", "7fxs", "bc06", "o4o9", "3yvh", "hyzr", "kk87", "b6i0", "ny3y", "2qby", "ayp7", "t1ng", "4r4i", "35fb", "53fz", "kwxw", "ltiy", "o1x0", "6039", "6pvi", "koe1"]
  if (typeof code !== "string" || code.length === 0 || codes.includes(code) === false || codes.includes(code) === false) {
    return json({ errors: { code: "Check if the randomization code matches the code you have been assigned" } }, { status: 400 });
  }
  if (typeof interventionForm !== "string") {
    return json({ errors: { interventionForm: "You need to choose an answer for both questions" } }, { status: 400 });
  }
  if (typeof blinding !== "string") {
    return json({ errors: { interventionForm: "You need to choose an answer for both questions" } }, { status: 400 });
  }

  const intervention = await createIntervention({ code, interventionForm, blinding, userId });
  return redirect(`/intervention/${intervention.id}`);
};

export default function NewInterventionPage() {
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
        <Radio name="interventionForm" label="Did the participant eat at least one smartie from the bag they were assigned?" options={["yes", "no"]}/>
        <Radio name="blinding" label="Was participant blinding to the randomization assignment maintained:" options={["yes", "no"]}/>
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
        {actionData?.errors.interventionForm ? (
          <p style={{ color: "red" }}>
            {actionData.errors.interventionForm}
          </p>
        ) : null}
        {actionData?.errors.blinding ? (
          <p style={{ color: "red" }}>
            {actionData.errors.blinding}
          </p>
        ) : null}
      </Form>
    </>
  );
}
