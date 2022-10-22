import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createBaseline } from "~/models/baseline.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const code = formData.get("code");
  const happy = formData.get("happy");
  const smarties = formData.get("smarties");
  const codes = ["tz3e","9v0m","70i1","l2z9","qms3","xfak","h6vq","hmo1","rdee","nnbz","ttm2","qspi","yf1h","nhoz","uys3","tfwd","36l7","td3n","80pb","bhml","b8ew","j67k","3cle","6ihx","oaab","nooa","bd99","mnsf","w9t3","tliq","7fxs","bc06","o4o9","3yvh","hyzr","kk87","b6i0","ny3y","2qby","ayp7","t1ng","4r4i","35fb","53fz","kwxw","ltiy","o1x0","6039","6pvi","koe1"]
  if (typeof code !== "string" || code.length === 0 || codes.includes(code) === false || codes.includes(code) === false ) {
    return json({ errors: { code: "Check if the randomization code matches the code you have been assigned" } }, { status: 400 });
  }
  if (typeof happy !== "string" || happy === '0' ) {
    return json({ errors: { happy: "Has to be a number between 1 and 10" } }, { status: 400 });
  }
  if (typeof smarties !== "string" || smarties === '0' ) {
    return json({ errors: { happy: "Has to be a number between 1 and 10" } }, { status: 400 });
  }

  const baseline = await createBaseline({ code, happy, smarties, userId });
  return redirect(`/baseline/${baseline.id}`);
};

export default function NewBaselinePage() {
  const actionData = useActionData();

  return (
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
          <span>Randomization code: </span>
          <input
            name="code"
            required
            maxLength={4}
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
      </div>
      <div>
          <span>How happy are you right now on a scale of 0 = '😞' to 10 = '😄': </span>
          <input
            name="happy"
            type="number"
            min={0}
            max={10}
            defaultValue={10}
            required
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          ></input>
      </div>
      <div>
          <span>How much do you like smarties on a scale of 0 = '😞' to 10 = '😄': </span>
          <input
            name="smarties"
            type="number"
            min={0}
            max={10}
            defaultValue={10}
            required
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          ></input>
      </div>

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
    </Form>
  );
}
