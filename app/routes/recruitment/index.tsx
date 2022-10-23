import { Link } from "@remix-run/react";

export default function RecruitmentIndexPage() {
  return (
    <p>
      <Link to="new" className="text-blue-500 underline">
        Create new recruitment data.
      </Link>
    </p>
  );
}
