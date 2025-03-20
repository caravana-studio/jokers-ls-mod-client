import { useEffect, useState } from "react";
import { controller } from "../controller/controller";

export const useUsername = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    controller.username()?.then((username) => {
      setUsername(username);
    });
  }, [controller]);

  return username;
};
