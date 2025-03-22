import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default async function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/login");
  }

  return <>{children}</>;

  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
  //     <h1 className="text-red-800">
  //       this is a protected route! User IS Authorized!
  //     </h1>
  //   </div>
  // );
}
