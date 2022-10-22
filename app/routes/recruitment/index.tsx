import { Link } from "@remix-run/react";

export default function RecruitmentIndexPage() {
  return (
    <p>
      No recruitment selected. Select a code on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new recruitment.
      </Link>
    </p>
  );
}
