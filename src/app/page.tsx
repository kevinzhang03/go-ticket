'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

import GoLogo from '@assets/go.svg';
import Barcode from '@assets/barcode.svg';
import Train from '@assets/train.svg';
import RightArrow from '@assets/rightarrow.svg';

// Constants
const VALID_DURATION = 24 * 60 * 60; // 24 hours in seconds
const TICKET_PREFIX = 'MZ';

// Types
interface TimeState {
  currentTime: Date;
  timeRemaining: number;
  activationTime: Date;
  ticketNumber: string;
}

const TicketPage: React.FC = () => {
  // Initialize state with null values until component mounts
  const [timeState, setTimeState] = useState<TimeState | null>(null);

  // Setup timer and initial values
  useEffect(() => {
    const activationTime = new Date(new Date().setHours(10, 0, 0));
    const ticketNumber = generateTicketNumber();
    const initialState: TimeState = {
      currentTime: new Date(),
      timeRemaining: VALID_DURATION,
      activationTime,
      ticketNumber,
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
      <Image src={GoLogo} alt="GO Transit logo" className="my-4 h-[45px]" />
      <Marquee speed={100} autoFill>
        <div className="flex w-96 flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">GO TRANSIT</h1>
          <div className="flex flex-grow justify-center">
            <h1 className="text-2xl font-bold">•</h1>
          </div>
        </div>
      </Marquee>
      <p className="mb-8 text-lg">
        Unionville GO to Union Station GO - Weekend Pass
      </p>
      <TicketCard
        ticketNumber={timeState.ticketNumber}
        currentTime={timeState.currentTime}
        timeSinceActivation={timeSinceActivation}
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
  return new Date(seconds * 1000).toISOString().slice(11, 19); // Extracts HH:MM:SS
};

interface TicketCardProps {
  ticketNumber: string;
  currentTime: Date;
  timeSinceActivation: number;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticketNumber,
  currentTime,
  timeSinceActivation,
}) => (
  <div className="border-active-gold relative flex w-full flex-col items-center justify-center space-y-2 border-t-[6px] bg-white py-6 text-black shadow-md shadow-active-gold-light">
    <div className="bg-active-gold absolute left-1/2 top-0 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white"></div>
    <TicketInfoSection />
    <hr className="border-primary w-full border-2 border-dashed" />
    <BarcodeSection ticketNumber={ticketNumber} />
    <TimeInfoSection
      currentTime={currentTime}
      timeSinceActivation={formatTimeSinceActivation(timeSinceActivation)}
    />
  </div>
);

const TicketInfoSection: React.FC = () => (
  <div className="relative flex w-full flex-row items-center">
    <div className="flex w-1/2 flex-col items-center justify-center">
      <p className="text-5xl font-bold">x1</p>
      <p className="text-xl">Passenger(s)</p>
    </div>
    <div className="bg-primary h-full w-px overflow-visible">
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
}

const BarcodeSection: React.FC<BarcodeSectionProps> = ({ ticketNumber }) => (
  <div className="flex w-full flex-col items-center px-6">
    <p className="text-xl">
      Ticket Number: <strong>{ticketNumber}</strong>
    </p>
    <div className="relative">
      <Image src={Barcode} alt="Barcode" className="w-full" />
      <div className="animate-pulse-text-gold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
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
  <div className="flex w-5/6 flex-col items-center justify-center text-center">
    <p className="text-xl">
      Please show this screen to the proper authority on board the train
    </p>
    <p className="text-5xl">{formatTimeRemaining(timeRemaining)}</p>
  </div>
);

export default TicketPage;
