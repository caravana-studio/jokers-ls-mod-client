import { Box } from "@chakra-ui/react";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAudioPlayer } from "../providers/AudioPlayerProvider";

const AudioPlayer = () => {
  const { isPlaying, toggleSound } = useAudioPlayer();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 1000,
      }}
    >
      <Box sx={{ cursor: "pointer" }} onClick={toggleSound}>
        {isPlaying ? (
          <FontAwesomeIcon color='white' fontSize={20} icon={faVolumeXmark} />
        ) : (
          <FontAwesomeIcon color='white'  fontSize={20} icon={faVolumeHigh} />
        )}
      </Box>
    </Box>
  );
};

export default AudioPlayer;
