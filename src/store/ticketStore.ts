import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Constants
const VALID_DURATION = 24 * 60 * 60; // 24 hours in seconds
const TICKET_PREFIX = 'MZ';

export type ThemeType = 'gold' | 'green';

interface TicketState {
  currentTime: Date;
  timeRemaining: number;
  activationTime: Date;
  ticketNumber: string;
  validDuration: number;
  passengerCount: number;
  sourceStation: string;
  destinationStation: string;
  isWeekendPass: boolean;
  colorTheme: ThemeType;
}

interface TicketActions {
  updateTicket: (updates: Partial<TicketState>) => void;
  generateNewTicket: () => void;
  updateTimeRemaining: () => void;
  resetToDefaults: () => void;
}

// Helper functions
const generateTicketNumber = (): string => {
  const randomDigits = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10),
  ).join('');
  return TICKET_PREFIX + randomDigits;
};

const calculateElapsedTime = (current: Date, activation: Date): number => {
  return Math.floor((current.getTime() - activation.getTime()) / 1000);
};

// Default state
const getDefaultState = (): TicketState => {
  const now = new Date();
  const activationTime = new Date(now.getTime() - 20 * 60 * 60 * 1000); // 20 hours ago

  return {
    currentTime: now,
    timeRemaining: VALID_DURATION - calculateElapsedTime(now, activationTime),
    activationTime,
    ticketNumber: generateTicketNumber(),
    validDuration: VALID_DURATION,
    passengerCount: 1,
    sourceStation: 'Kitchener GO',
    destinationStation: 'Union Station GO',
    isWeekendPass: false,
    colorTheme: 'gold',
  };
};

export const useTicketStore = create<TicketState & TicketActions>()(
  persist(
    (set, get) => ({
      ...getDefaultState(),

      updateTicket: (updates) => {
        set((state) => {
          const newState = { ...state, ...updates };

          // If activation time or valid duration changed, recalculate time remaining
          if (updates.activationTime || updates.validDuration) {
            const elapsed = calculateElapsedTime(
              new Date(),
              updates.activationTime || state.activationTime,
            );
            newState.timeRemaining = Math.max(
              0,
              (updates.validDuration || state.validDuration) - elapsed,
            );
          }

          return newState;
        });
      },

      generateNewTicket: () => {
        set((state) => ({
          ...state,
          ticketNumber: generateTicketNumber(),
        }));
      },

      updateTimeRemaining: () => {
        const state = get();
        const now = new Date();
        const elapsed = calculateElapsedTime(now, state.activationTime);

        set({
          currentTime: now,
          timeRemaining: Math.max(0, state.validDuration - elapsed),
        });
      },

      resetToDefaults: () => {
        set(getDefaultState());
      },
    }),
    {
      name: 'ticket-storage',
      partialize: (state) => ({
        activationTime: state.activationTime,
        ticketNumber: state.ticketNumber,
        validDuration: state.validDuration,
        passengerCount: state.passengerCount,
        sourceStation: state.sourceStation,
        destinationStation: state.destinationStation,
        isWeekendPass: state.isWeekendPass,
        colorTheme: state.colorTheme,
      }),
    },
  ),
);
