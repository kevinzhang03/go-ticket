'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { useTheme } from '@/components/ThemeProvider';

import GoLogo from '@assets/go.svg';
import Barcode from '@assets/barcode.svg';
import Train from '@assets/train.svg';
import RightArrow from '@assets/rightarrow.svg';
import ConfigModal from '@/components/ConfigModal';

// Constants
const VALID_DURATION = 24 * 60 * 60; // 24 hours in seconds
const TICKET_PREFIX = 'MZ';

// Types
interface TimeState {
  currentTime: Date;
  timeRemaining: number;
  activationTime: Date;
  ticketNumber: string;
  validDuration: number;
  passengerCount: number;
  sourceStation: string;
  destinationStation: string;
  isWeekendPass: boolean;
  colorTheme: 'gold' | 'green';
}

const TicketPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeState, setTimeState] = useState<TimeState | null>(null);

  useEffect(() => {
    // Set activation time to 20 hours ago
    const now = new Date();
    const activationTime = new Date(now.getTime() - 20 * 60 * 60 * 1000);

    const initialState: TimeState = {
      currentTime: now,
      timeRemaining: VALID_DURATION,
      activationTime,
      ticketNumber: generateTicketNumber(),
      validDuration: VALID_DURATION,
      passengerCount: 1,
      sourceStation: 'Kitchener GO',
      destinationStation: 'Union Station GO',
      isWeekendPass: false,
      colorTheme: 'gold',
    };

    setTimeState(initialState);

    const interval = setInterval(() => {
      setTimeState((prevState) => {
        if (!prevState) return prevState;

        const now = new Date();
        const elapsedSeconds = calculateElapsedTime(
          now,
          prevState.activationTime,
        );
        const remaining = Math.max(0, VALID_DURATION - elapsedSeconds);

        return {
          ...prevState,
          currentTime: now,
          timeRemaining: remaining,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeState?.colorTheme) {
      setTheme(timeState.colorTheme);
    }
  }, [timeState?.colorTheme, setTheme]);

  useEffect(() => {
    if (!timeState) return;

    const now = new Date();
    const elapsedSeconds = calculateElapsedTime(now, timeState.activationTime);
    const remaining = Math.max(0, timeState.validDuration - elapsedSeconds);

    setTimeState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        timeRemaining: remaining,
      };
    });
  }, [timeState?.activationTime, timeState?.validDuration]);

  const handleConfigChange = (newConfig: Partial<TimeState>) => {
    setTimeState((prev) => {
      if (!prev) return prev;
      return { ...prev, ...newConfig };
    });
  };

  const handleGenerateNewTicket = () => {
    handleConfigChange({ ticketNumber: generateTicketNumber() });
  };

  // Show loading state if data isn't ready
  if (!timeState) {
    return <p>Loading...</p>;
  }

  // Compute time since activation
  const timeSinceActivation = calculateElapsedTime(
    timeState.currentTime,
    timeState.activationTime,
  );

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        <Image src={GoLogo} alt="GO Transit logo" className="my-4 h-[45px]" />
      </div>

      {timeState && (
        <ConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          config={{
            validDuration: timeState.validDuration,
            activationTime: timeState.activationTime,
            ticketNumber: timeState.ticketNumber,
            passengerCount: timeState.passengerCount,
            sourceStation: timeState.sourceStation,
            destinationStation: timeState.destinationStation,
            isWeekendPass: timeState.isWeekendPass,
            colorTheme: timeState.colorTheme,
          }}
          onConfigChange={handleConfigChange}
          onGenerateNewTicket={handleGenerateNewTicket}
        />
      )}

      <Marquee speed={100} autoFill>
        <div className="flex w-96 flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">GO TRANSIT</h1>
          <div className="flex flex-grow justify-center">
            <h1 className="text-2xl font-bold">•</h1>
          </div>
        </div>
      </Marquee>
      <p className="mb-8 text-lg">
        {timeState.sourceStation} to {timeState.destinationStation}
        {timeState.isWeekendPass && ' - Weekend Pass'}
      </p>
      <TicketCard
        ticketNumber={timeState.ticketNumber}
        currentTime={timeState.currentTime}
        timeSinceActivation={timeSinceActivation}
        passengerCount={timeState.passengerCount}
        colorTheme={timeState.colorTheme}
      />
      <TicketFooter timeRemaining={timeState.timeRemaining} />
    </>
  );
};

// Helper functions
const generateTicketNumber = (): string => {
  return TICKET_PREFIX + Math.random().toString(36).slice(2, 10).toUpperCase();
};

const calculateElapsedTime = (current: Date, activation: Date): number => {
  // This will return negative seconds if activation is in the future
  return Math.floor((current.getTime() - activation.getTime()) / 1000);
};

const formatTime = (time: Date): string => {
  const month = time.toLocaleString('en-US', { month: 'short' });
  const day = time.getDate();
  const year = time.getFullYear();
  const hours = time.getHours() % 12 || 12;
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  return `${month} ${day} ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
};

const formatTimeRemaining = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const formatTimeSinceActivation = (seconds: number): string => {
  const isNegative = seconds < 0;
  const absoluteSeconds = Math.abs(seconds);

  // Format as HH:MM:SS
  const hours = Math.floor(absoluteSeconds / 3600);
  const minutes = Math.floor((absoluteSeconds % 3600) / 60);
  const remainingSeconds = absoluteSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  // Add negative sign if needed
  return isNegative ? `-${formattedTime}` : formattedTime;
};

interface TicketCardProps {
  ticketNumber: string;
  currentTime: Date;
  timeSinceActivation: number;
  passengerCount: number;
  colorTheme: 'gold' | 'green';
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticketNumber,
  currentTime,
  timeSinceActivation,
  passengerCount,
  colorTheme,
}) => (
  <div
    className={`relative flex w-full flex-col items-center justify-center space-y-2 border-t-[6px] bg-white py-6 text-black shadow-md ${
      colorTheme === 'gold'
        ? 'border-active-gold shadow-active-gold-light'
        : 'border-active-green shadow-active-green-light'
    }`}
  >
    <div
      className={`absolute -top-1 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white ${
        colorTheme === 'gold' ? 'bg-active-gold' : 'bg-active-green'
      }`}
    ></div>
    <TicketInfoSection passengerCount={passengerCount} />
    <hr className="w-full border border-dashed border-primary" />
    <BarcodeSection ticketNumber={ticketNumber} colorTheme={colorTheme} />
    <TimeInfoSection
      currentTime={currentTime}
      timeSinceActivation={formatTimeSinceActivation(timeSinceActivation)}
    />
  </div>
);

const TicketInfoSection: React.FC<{ passengerCount: number }> = ({
  passengerCount,
}) => (
  <div className="relative flex w-full flex-row items-center">
    <div className="flex w-1/2 flex-col items-center justify-center">
      <p className="text-5xl font-bold">x{passengerCount}</p>
      <p className="text-xl">Passenger(s)</p>
    </div>
    <div className="h-full w-px overflow-visible bg-primary">
      <Image
        src={Train}
        width={24}
        alt="Train Icon"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div className="flex w-1/2 flex-col items-center justify-center">
      <Image src={RightArrow} alt="Ticket Icon" className="w-[40px]" />
      <p className="text-xl font-bold">One-way</p>
    </div>
  </div>
);

interface BarcodeSectionProps {
  ticketNumber: string;
  colorTheme: 'gold' | 'green';
}

const BarcodeSection: React.FC<BarcodeSectionProps> = ({
  ticketNumber,
  colorTheme,
}) => (
  <div className="flex w-full flex-col items-center px-6">
    <p className="text-xl">
      Ticket Number: <strong>{ticketNumber}</strong>
    </p>
    <div className="relative">
      <Image src={Barcode} alt="Barcode" className="w-full" />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 ${
          colorTheme === 'gold'
            ? 'animate-pulse-text-gold'
            : 'animate-pulse-text-green'
        }`}
      >
        <p className="whitespace-nowrap text-[26px]">VALID FOR TRAVEL</p>
      </div>
    </div>
  </div>
);

interface TimeInfoSectionProps {
  currentTime: Date;
  timeSinceActivation: string;
}

const TimeInfoSection: React.FC<TimeInfoSectionProps> = ({
  currentTime,
  timeSinceActivation,
}) => (
  <div className="flex w-full flex-row">
    <div className="flex flex-grow flex-col items-center justify-center font-bold">
      <p className="text-xs">CURRENT TIME:</p>
      <p className="text-xl">{formatTime(currentTime)}</p>
    </div>
    <div className="flex flex-grow flex-col items-center justify-center font-bold">
      <p className="text-xs">TIME SINCE ACTIVATION:</p>
      <p className="text-xl">{timeSinceActivation}</p>
    </div>
  </div>
);

interface TicketFooterProps {
  timeRemaining: number;
}

const TicketFooter: React.FC<TicketFooterProps> = ({ timeRemaining }) => (
  <div className="mt-36 flex w-5/6 flex-col items-center justify-center text-center">
    <p className="text-xl">
      Please show this screen to the proper authority on board the train
    </p>
    <p className="text-5xl">{formatTimeRemaining(timeRemaining)}</p>
  </div>
);

export default TicketPage;
