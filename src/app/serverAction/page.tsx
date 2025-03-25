import { getServerSession } from "next-auth";

export default async function ServerActionPage() {
  const whoAmI = async () => {
    "use server";
    const session = await getServerSession();
    if (!session) {
      return "Not Logged In";
    }

    const identity = { name: session.user?.name, id: session.user?.id };

    return identity;
  };
}
