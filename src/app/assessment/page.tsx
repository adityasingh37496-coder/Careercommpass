import type { Metadata } from "next";
import { AssessmentFlow } from "@/components/assessment/assessment-flow";

export const metadata: Metadata = {
  title: "Career discovery",
  description: "Tell us your skills and interests to see demo career matches.",
};

export default function AssessmentPage() {
  return <AssessmentFlow />;
}
