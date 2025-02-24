import Marquee from 'react-fast-marquee';
import Image from 'next/image';

import GoLogo from '@assets/go.svg';
import Barcode from '@assets/barcode.svg';
import Train from '@assets/train.svg';

const GoTransitTicket = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-[#6b683e] p-4 text-white">
      {/* Header */}
      <div className="relative w-full overflow-hidden bg-[#6b683e] py-2 text-center text-white">
        <Image
          src={GoLogo}
          alt="GO Logo"
          width={64}
          height={64}
          className="mx-auto mb-2"
        />
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block text-sm font-semibold uppercase tracking-wide">
            GO TRANSIT • GO TRANSIT • GO TRANSIT • GO TRANSIT • GO TRANSIT •
          </div>
        </div>
        <p className="mt-6 text-xs">
          Unionville GO to Union Station GO - Weekend Pass
        </p>
      </div>

      {/* Ticket Info */}
      <div className="mt-2 w-full max-w-md rounded-md bg-white p-6 text-center text-black shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">x1</div>
          <Image src={Train} alt="Train Icon" width={24} height={24} />
          <div className="rounded border px-2 py-1 text-xs">Multi Use Pass</div>
        </div>
        <p className="mt-2 text-sm">1× Weekend Pass</p>
        <p className="mt-4 text-xs font-semibold">
          Ticket Number: <span className="font-bold">MZ63036597</span>
        </p>

        {/* Barcode with overlay text */}
        <div className="relative mt-4">
          <Image src={Barcode} alt="Barcode" width={300} height={50} />
          <p className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#6b683e]">
            VALID FOR TRAVEL
          </p>
        </div>

        {/* Time Info */}
        <div className="mt-4 flex justify-between text-xs">
          <p>
            CURRENT TIME:
            <br />
            <span className="font-bold">Feb 23 2025, 12:39:04 PM</span>
          </p>
          <p>
            TIME SINCE ACTIVATION:
            <br />
            <span className="font-bold">19:31:37</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-xs">
        <p>
          Please show this screen to the proper authority on board the train.
        </p>
        <p className="mt-2 text-2xl font-bold">04:28:22</p>
      </div>
    </div>
  );
};

export default GoTransitTicket;
