import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { Howl } from "howler";
import { SOUND_OFF } from "../constants/localStorage.ts";

interface AudioPlayerContextProps {
  isPlaying: boolean;
  toggleSound: () => void;
  changeSong: (newSongPath: string, isBeast?: boolean) => void;
  beastSound: boolean;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(
  undefined
);

interface AudioPlayerProviderProps extends PropsWithChildren {
  initialSongPath: string;
}

export const AudioPlayerProvider = ({
  children,
  initialSongPath,
}: AudioPlayerProviderProps) => {
  const [sound, setSound] = useState<Howl | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beastSound, setIsBeastSound] = useState(false);
  const [gameWithSound, setGameWithSound] = useState(
    !localStorage.getItem(SOUND_OFF)
  );
  const [songPath, setSongPath] = useState(initialSongPath);

  useEffect(() => {
    if (sound) {
      sound.unload();
    }

    const howl = new Howl({
      src: [songPath],
      loop: true,
      volume: 0.2,
    });
    setSound(howl);
  }, [songPath]);

  useEffect(() => {
    if (sound) {
      if (gameWithSound) {
        sound.play();
        setIsPlaying(true);
      }
    }
  }, [sound]);

  useEffect(() => {
    if (sound) {
      if (gameWithSound) {
        sound.play();
        setIsPlaying(true);
      } else {
        sound.stop();
        setIsPlaying(false);
      }
    }
  }, [gameWithSound]);

  const toggleSound = () => {
    if (gameWithSound) {
      localStorage.setItem(SOUND_OFF, "true");
      setGameWithSound(false);
    } else {
      localStorage.removeItem(SOUND_OFF);
      setGameWithSound(true);
    }
  };

  const changeSong = (newSongPath: string, isBeast: boolean = false) => {
    setSongPath(newSongPath);
    setIsBeastSound(isBeast);
  };

  return (
    <AudioPlayerContext.Provider
      value={{ isPlaying, toggleSound, changeSong, beastSound }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioPlayerContextProps => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }
  return context;
};
