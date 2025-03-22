import ProtectedRoute from "@/components/protected/ProtectedRoute";
import SurveyPage from "./survey.client";

export default function Survey() {
  return (
    <ProtectedRoute>
      <SurveyPage />
    </ProtectedRoute>
  );
}
