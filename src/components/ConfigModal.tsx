'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Station } from '@/types/station';
import { fetchStationData } from '@/utils/fetchStationData';

// Types
interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    validDuration: number;
    activationTime: Date;
    ticketNumber: string;
    passengerCount: number;
    sourceStation: string;
    destinationStation: string;
    isWeekendPass: boolean;
    colorTheme: 'gold' | 'green';
  };
  onConfigChange: (newConfig: Partial<ConfigModalProps['config']>) => void;
  onGenerateNewTicket: () => void;
}

// Station Selector Component
interface StationSelectorProps {
  label: string;
  value: string;
  stationCode: string;
  stationsByCorridors: Record<string, Station[]>;
  onChange: (value: string) => void;
}

const StationSelector: React.FC<StationSelectorProps> = ({
  label,
  value,
  stationCode,
  stationsByCorridors,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium">
      {label}{' '}
      {stationCode && <span className="ml-1 font-mono">({stationCode})</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-xl border bg-white/40 p-2 backdrop-blur-sm"
    >
      <option value="">Select a station</option>
      {Object.entries(stationsByCorridors).map(([corridor, stations]) => (
        <optgroup key={corridor} label={corridor}>
          {stations.map((station) => (
            <option key={station.name} value={station.name}>
              {station.name} GO
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  </div>
);

// Input Field Component
interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
  min?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  min,
}) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      min={min}
      onChange={(e) =>
        onChange(type === 'number' ? Number(e.target.value) : e.target.value)
      }
      className="mt-1 w-full rounded-xl border bg-white/40 p-2 backdrop-blur-sm"
    />
  </div>
);

// Ticket Number Field with Generate Button
interface TicketNumberFieldProps {
  ticketNumber: string;
  onTicketNumberChange: (value: string) => void;
  onGenerateNewTicket: () => void;
}

const TicketNumberField: React.FC<TicketNumberFieldProps> = ({
  ticketNumber,
  onTicketNumberChange,
  onGenerateNewTicket,
}) => (
  <div>
    <label className="block text-sm font-medium">Ticket Number</label>
    <div className="mt-1 flex gap-2">
      <input
        type="text"
        value={ticketNumber}
        onChange={(e) => onTicketNumberChange(e.target.value)}
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
);

// Weekend Pass Checkbox
interface WeekendPassCheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const WeekendPassCheckbox: React.FC<WeekendPassCheckboxProps> = ({
  isChecked,
  onChange,
}) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id="weekendPass"
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 rounded border-gray-300"
    />
    <label htmlFor="weekendPass" className="text-sm font-medium">
      Weekend Pass
    </label>
  </div>
);

// Add a new component for the color theme selector
interface ColorThemeSelectorProps {
  selectedTheme: 'gold' | 'green';
  onChange: (theme: 'gold' | 'green') => void;
}

const ColorThemeSelector: React.FC<ColorThemeSelectorProps> = ({
  selectedTheme,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium">Color Theme</label>
    <div className="mt-2 flex gap-3">
      <button
        onClick={() => onChange('gold')}
        className={`h-10 w-10 rounded-full border-2 ${
          selectedTheme === 'gold'
            ? 'border-white ring-2 ring-yellow-500'
            : 'border-gray-300'
        }`}
        style={{ background: 'linear-gradient(to bottom, #807739, #383419)' }}
        aria-label="Gold theme"
      />
      <button
        onClick={() => onChange('green')}
        className={`h-10 w-10 rounded-full border-2 ${
          selectedTheme === 'green'
            ? 'border-white ring-2 ring-green-500'
            : 'border-gray-300'
        }`}
        style={{ background: 'linear-gradient(to bottom, #2A7A12, #0D3D00)' }}
        aria-label="Green theme"
      />
    </div>
  </div>
);

// Main ConfigModal Component
const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigChange,
  onGenerateNewTicket,
}) => {
  const [stationData, setStationData] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStationData = async () => {
      try {
        const stations = await fetchStationData();
        setStationData(stations);
      } catch (error) {
        console.error('Error loading station data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStationData();
  }, []);

  // Group stations by corridor
  const stationsByCorridors = useMemo(() => {
    const corridors: Record<string, Station[]> = {};

    stationData.forEach((station) => {
      if (!corridors[station.corridor]) {
        corridors[station.corridor] = [];
      }
      corridors[station.corridor].push(station);
    });

    return corridors;
  }, [stationData]);

  // Get station code for display
  const getStationCode = (stationName: string): string => {
    const station = stationData.find((s) => s.name === stationName);
    return station ? station.code : '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white/20 p-6 shadow-xl backdrop-blur-md before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[2rem] before:border-[2px] before:border-white/50 before:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
        <div className="relative z-10">
          <h2 className="mb-4 text-2xl font-bold">Configure Ticket</h2>

          {isLoading ? (
            <div className="py-4 text-center">Loading station data...</div>
          ) : (
            <div className="space-y-4">
              {/* Station Selection */}
              <div className="space-y-4">
                <StationSelector
                  label="From Station"
                  value={config.sourceStation}
                  stationCode={getStationCode(config.sourceStation)}
                  stationsByCorridors={stationsByCorridors}
                  onChange={(value) => onConfigChange({ sourceStation: value })}
                />

                <StationSelector
                  label="To Station"
                  value={config.destinationStation}
                  stationCode={getStationCode(config.destinationStation)}
                  stationsByCorridors={stationsByCorridors}
                  onChange={(value) =>
                    onConfigChange({ destinationStation: value })
                  }
                />

                <WeekendPassCheckbox
                  isChecked={config.isWeekendPass}
                  onChange={(checked) =>
                    onConfigChange({ isWeekendPass: checked })
                  }
                />
              </div>

              {/* Valid Duration */}
              <InputField
                label="Valid Duration (hours)"
                type="number"
                value={config.validDuration / 3600}
                onChange={(value) =>
                  onConfigChange({ validDuration: Number(value) * 3600 })
                }
              />

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
              <TicketNumberField
                ticketNumber={config.ticketNumber}
                onTicketNumberChange={(value) =>
                  onConfigChange({ ticketNumber: value })
                }
                onGenerateNewTicket={onGenerateNewTicket}
              />

              {/* Passenger Count */}
              <InputField
                label="Number of Passengers"
                type="number"
                value={config.passengerCount}
                onChange={(value) =>
                  onConfigChange({ passengerCount: Number(value) })
                }
                min="1"
              />

              {/* Color Theme Selector */}
              <ColorThemeSelector
                selectedTheme={config.colorTheme}
                onChange={(theme) => onConfigChange({ colorTheme: theme })}
              />
            </div>
          )}

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
