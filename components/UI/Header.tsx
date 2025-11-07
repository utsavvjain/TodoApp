import { useTheme as useNextTheme } from "next-themes";
import { MdWbSunny, MdBedtime } from "react-icons/md";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import {
  Button,
  Spinner,
  Switch
} from "@nextui-org/react";

const Header: React.FC = () => {
  const { setTheme, theme } = useNextTheme();
  const router = useRouter();

  const { data: session, status } = useSession();

  let menu;

  if (!session) {
    menu = (
      <Button
        color="primary"
        onClick={() => router.push("/api/auth/signin")}
      >
        Login
      </Button>
    );
  } else {
    menu = (
      <Button
        color="primary"
        variant="flat"
        onClick={() => signOut()}
      >
        Logout ({session?.user?.email})
      </Button>
    );
  }

  if (status === "loading") {
    menu = (
      <Button color="primary" isDisabled>
        <Spinner color="white" size="sm" />
      </Button>
    );
  }

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</h3>
          </div>
          <div className="flex items-center gap-4">
            {menu}
            <Switch
              onValueChange={(checked) => setTheme(checked ? "dark" : "light")}
              size="lg"
              isSelected={theme === "dark"}
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <MdWbSunny className={className} />
                ) : (
                  <MdBedtime className={className} />
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
