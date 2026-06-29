import getUser from "@/features/auth/actions/getUser";
import { ProfileClient } from "@/features/profile/components/ProfileClient";

export default async function ProfilePage() {
  const user = await getUser();

  return <ProfileClient user={user} />;
}
