import { useState, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { throttle } from "lodash";

export const useResponsiveValues = () => {
  const [aspectRatio, setAspectRatio] = useState<number>(
    window.innerWidth / window.innerHeight
  );
  const [cardScale, setCardScale] = useState<number>(1);
  const [isCardScaleCalculated, setisCardScaleCalculated] = useState(false);

  const defaultBaseScale = useBreakpointValue(
    {
      base: 0.4,
      sm: 0.75,
      md: 1.6,
      lg: 2,
    },
    { ssr: false }
  );

  useEffect(() => {
    if (defaultBaseScale === undefined) {
      return;
    }

    const handleResize = throttle(() => {
      const newAspectRatio = window.innerWidth / window.innerHeight;
      setAspectRatio(newAspectRatio);

      let baseScale = 1;
      if (window.innerWidth === 540 && window.innerHeight === 720) {
        baseScale = 0.4; // Adjust for 540x720 resolution
      } else if (window.innerWidth === 1024 && window.innerHeight === 1366) {
        baseScale = 0.85; // Adjust for 1024x1366 resolution
      } else {
        baseScale = defaultBaseScale;
      }

      let cardScale = baseScale
        ? baseScale *
          (aspectRatio > 1 ? 1 / aspectRatio : 1 + (1 - aspectRatio) * 0.5)
        : 1;

      setCardScale(cardScale);
      setisCardScaleCalculated(true);
    }, 200);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [defaultBaseScale, aspectRatio]);

  const isSmallScreen = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  return { cardScale, isSmallScreen, isCardScaleCalculated };
};
