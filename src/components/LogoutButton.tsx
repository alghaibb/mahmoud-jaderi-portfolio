import { auth, signOut } from "../auth";
import { Button } from "./ui/button";

const LogoutButton = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        {user && <Button type="submit">Logout</Button>}
      </form>
    </div>
  );
};

export default LogoutButton;
