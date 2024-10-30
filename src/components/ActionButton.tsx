import { Box, useTheme } from "@chakra-ui/react";

interface IActionButtonProps {
  position: "LEFT" | "RIGHT";
  label: string[];
  secondLabel: string;
  disabled: boolean;
  onClick: () => void;
  setNodeRef?: (element: HTMLElement | null) => void;
}
export const ActionButton = ({
  setNodeRef,
  position,
  label,
  disabled,
  onClick,
  secondLabel,
}: IActionButtonProps) => {
  const { colors } = useTheme();
  const color = position === "RIGHT" ? colors.opaqueNeonGreen : colors.neonPink;
  const extraSx =
    position === "LEFT"
      ? {
          ml: -130,
          pl: 120,
          textAlign: "left",
        }
      : {
          mr: -130,
          pr: 120,
          textAlign: "right",
        };
  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2000,
        height: 300,
        width: 300,
        fontSize: 35,
        opacity: disabled ? 0.7 : 1,
        backgroundColor: "transparent",
        border: `5px solid ${color}`,
        color: color,
        filter: "blur(0.5px)",
        boxShadow: `0px 0px 10px 0px ${color}`,
        cursor: disabled ? "not-allowed" : "pointer",
        textShadow: `0 0 5px ${color}`,
        "&:hover": {
          border: `5px solid ${color}`,
          boxShadow: `0px 0px 30px 0px ${color}`,
          backgroundColor: "transparent",
        },
        ...extraSx,
      }}
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onClick();
      }}
    >
      <Box>
        <Box>
          {label.map((str: string) => {
            return (
              <span key={str}>
                {str}
                <br />
              </span>
            );
          })}
        </Box>
        <Box sx={{ fontSize: 20, mt: 2, color: "white" }}>{secondLabel}</Box>
      </Box>
    </Box>
  );
};