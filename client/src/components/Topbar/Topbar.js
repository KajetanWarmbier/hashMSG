import { MdSignalCellularAlt, MdWifi, MdBatteryFull } from 'react-icons/md';

const Topbar = () => {
  return (
    <div className='rounded-[44px] h-[44px] w-[390px] text-white'>
      <div className='pt-5 px-10 grid grid-cols-2'>
        <div>9:41</div>
        <div className='flex justify-end items-center gap-2'>
          <MdSignalCellularAlt />
          <MdWifi />
          <MdBatteryFull />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
