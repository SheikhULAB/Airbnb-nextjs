import Image from 'next/image';
import React, { useState } from 'react';
import {
    GlobeAltIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    UsersIcon
} from "@heroicons/react/24/solid";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';



const Header = ({placeholder}) => {
    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const router = useRouter();


    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.starDate);
        setEndDate(ranges.selection.endDate)
    }

    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuests,
            }
        });
    }

    const selectionRange = {
        starDate: startDate,
        endDate: endDate,
        key: 'selection'
    }


    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md
          py-5 px-5 md:px-10'>
            <div 
            onClick={() => router.push("/")}
            className='relative flex items-center h-10 cursor-pointer my-auto'>
                <Image
                  src='https://links.papareact.com/qd3'
                  layout='fill'
                  objectFit='contain'
                  objectPosition='left'
                />
            </div>

            <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
                <input className='pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400' 
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                 placeholder={placeholder || "Start your Search"} />
                <MagnifyingGlassIcon className='hidden md:inline-flex h-8 bg-red-400 text-white
                 rounded-full p-2 cursor-pointer md:mx-2' />
            </div>

            <div className='flex items-center justify-end text-gray-500 space-x-4'>
                <p className='hidden md:inline cursor-pointer'>Become a host</p>
                <GlobeAltIcon className='h-6 cursor-pointer' />

                <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                 </svg>

                    <UserCircleIcon className='h-6' />
                </div>
            </div>

            {searchInput && (
                <div className='flex flex-col col-span-3 mx-auto'>
                   <DateRangePicker
                   ranges={[selectionRange]}
                   minDate={new Date()}
                   rangeColors={["#FD5B61"]}
                   onChange={handleSelect}
                   />
                   <div className='flex items-center border-b mb-4'> 
                    <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>

                    <UsersIcon className='h-5' />
                    <input 
                    value={numberOfGuests}
                    onChange={e => setNumberOfGuests(e.target.value)}
                    className='w-12 pl-2 text-lg outline-none text-red-400'
                    type="number"
                    min={1}
                    />
                    </div>
                    <div className='flex'>
                        <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
                        <button onClick={search} className='flex-grow text-red-400'>Search</button>
                    </div>
                </div>
               
            )}
        </header>
    );
};

export default Header;