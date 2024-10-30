import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer.tsx";
import { Background } from "../components/Background.tsx";
import { GAME_ID, LOGGED_USER } from "../constants/localStorage";
import { useCustomToast } from "../hooks/useCustomToast";
import { VIOLET } from "../theme/colors.tsx";

const regExpression = /^[a-zA-Z0-9._-]+$/;

export const Login = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const { showErrorToast } = useCustomToast();
  const { t } = useTranslation(["intermediate-screens"]);

  const redirectToGame = () => {
    navigate("/demo");
  };

  useEffect(() => {
    // if user is logged in, redirect to game
    const user = localStorage.getItem(LOGGED_USER);
    if (user) {
      redirectToGame();
    }
  }, []);

  const validateAndCreateUser = () => {
    if (!username) {
      showErrorToast(t("login.error-labels.error-noUsername-login"));
      return;
    }
    if (username.length < 3) {
      showErrorToast(t("login.error-labels.error-shortUsername-login"));
      return;
    }
    if (username.length > 15) {
      showErrorToast(t("login.error-labels.error-longUsername-login"));
      return;
    }
    // check for characters uppercase and lowercase letters, numbers,. ,- ,_
    // any other character is not allowed
    if (!regExpression.test(username)) {
      showErrorToast(t("login.error-labels.error-invalidUsername-login"));
      return;
    }
    localStorage.removeItem(GAME_ID);
    localStorage.setItem(LOGGED_USER, username);
    redirectToGame();
  };

  const onKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      validateAndCreateUser();
    } else if (event.key === "Escape") {
      navigate("/");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);

    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [onKeyDown]);

  useEffect(() => {
    document.getElementById("usernameInputField")?.focus();
  }, []);

  return (
    <Background type="home">
      <AudioPlayer />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Box
          border="2px solid #DAA1E8FF"
          boxShadow={`0px 0px 20px 15px ${VIOLET}`}
          filter="blur(0.5px)"
          backgroundColor="rgba(0, 0, 0, 1)"
          borderRadius="20px"
          display="grid"
          px={[4, 8]}
          py={4}
          pl={[10, 12]}
          width={{ base: "90%", sm: "600px" }}
        >
          <Heading variant="italic" color={VIOLET} size={"m"}>
            {t("login.labels.label-login")}
          </Heading>
          <Box
            pt={3}
            mb={6}
            w="95%"
            sx={{
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "1px",
                background: "white",
                boxShadow:
                  "0 0 1px 0px rgba(255, 255, 255), 0 0 8px 1px rgba(255, 255, 255)",
              },
            }}
          >
            <Input
              variant="neon-white"
              id="usernameInputField"
              type="text"
              placeholder={t("login.labels.placeholder-login")}
              ref={inputRef}
              maxLength={15}
              onChange={(e) => {
                setUsername(e.target.value.trim());
              }}
            />
          </Box>
        </Box>
        <Flex
          justifyContent="space-between"
          width={{ base: "90%", sm: "600px" }}
          pt={{ base: 10, sm: 14 }}
        >
          <Button
            width="46%"
            onClick={() => {
              navigate("/");
            }}
          >
            {t("login.btn.goBack-login-btn")}
          </Button>
          <Button
            width="46%"
            onClick={validateAndCreateUser}
            variant="secondarySolid"
          >
            {t("login.btn.startGame-login-btn")}
          </Button>
        </Flex>
      </Flex>
    </Background>
  );
};
