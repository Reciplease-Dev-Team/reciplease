import ProtectedRoute from "@/components/protected/ProtectedRoute";
import AppNav from "../../components/navigation/dashboardNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // maybe we always check the user survey status here, so that the entire dashboard is inaccessible until the user has completed the survey
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-auto pb-[72px]">{children}</main>
        <AppNav />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
