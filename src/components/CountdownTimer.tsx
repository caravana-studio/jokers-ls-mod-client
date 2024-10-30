import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const now = new Date();
    const difference = new Date(targetDate).getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return null;
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());
  const { t } = useTranslation(["home"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div>Tournament's over!</div>;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <Text size='l'>
      <span>{days} {t('tournament.labels.days-countdown-tournament')} </span>
      <span>{hours}h </span>
      <span>{minutes}m </span>
      <span>{seconds}s</span>
      {" " + t('tournament.labels.label-countdown-tournament')} 
    </Text>
  );
};

export default CountdownTimer;