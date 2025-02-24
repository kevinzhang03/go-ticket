'use client';

import React from 'react';
import { format } from 'date-fns';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    validDuration: number;
    activationTime: Date;
    ticketNumber: string;
    passengerCount: number;
  };
  onConfigChange: (newConfig: Partial<ConfigModalProps['config']>) => void;
  onGenerateNewTicket: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigChange,
  onGenerateNewTicket,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">
      <div className="relative w-96 rounded-[2rem] bg-white/20 p-6 shadow-xl backdrop-blur-md before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[2rem] before:border-[2px] before:border-white/50 before:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
        <div className="relative z-10">
          <h2 className="mb-4 text-2xl font-bold">Configure Ticket</h2>

          <div className="space-y-4">
            {/* Valid Duration */}
            <div>
              <label className="block text-sm font-medium">
                Valid Duration (hours)
              </label>
              <input
                type="number"
                value={config.validDuration / 3600}
                onChange={(e) =>
                  onConfigChange({
                    validDuration: Number(e.target.value) * 3600,
                  })
                }
                className="mt-1 w-full rounded-xl border bg-white/40 p-2 backdrop-blur-sm"
              />
            </div>

            {/* Activation Time */}
            <div>
              <label className="block text-sm font-medium">
                Activation Time
              </label>
              <input
                type="datetime-local"
                value={format(config.activationTime, "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) =>
                  onConfigChange({ activationTime: new Date(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border bg-white/40 p-2 backdrop-blur-sm"
              />
            </div>

            {/* Ticket Number */}
            <div>
              <label className="block text-sm font-medium">Ticket Number</label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  value={config.ticketNumber}
                  onChange={(e) =>
                    onConfigChange({ ticketNumber: e.target.value })
                  }
                  className="flex-1 rounded-xl border bg-white/40 p-2 backdrop-blur-sm"
                />
                <button
                  onClick={onGenerateNewTicket}
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Passenger Count */}
            <div>
              <label className="block text-sm font-medium">
                Number of Passengers
              </label>
              <input
                type="number"
                min="1"
                value={config.passengerCount}
                onChange={(e) =>
                  onConfigChange({ passengerCount: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border bg-white/40 p-2 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-xl bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
