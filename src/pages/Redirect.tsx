import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { Loading } from "../components/Loading";

export const Redirect = () => {
  return (
    <Background type={"game"}>
      <Loading />
      <PositionedGameMenu />
      <PositionedDiscordLink />
    </Background>
  );
};
