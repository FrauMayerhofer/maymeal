import { Button } from "@/components/ui/button";
import logout from "../actions/logout";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
