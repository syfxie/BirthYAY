import * as React from "react";

import Button from '../../components/UI/Button'
import SideBar from "../../components/SideBar";
import BirthdayCard from "../../components/BirthdayCard";

export default function Birthday() {
    console.log('Sophie birthday page');

    const user = {
        email: 'email@gmail.com',
        username: 'sophiexie',
        firstName: 'first',
        lastName: 'last',
        birthday: 'January 25',
        age: 20
    }

    return(
        <div className='flex min-h-screen bg-background items-center justify-center'>
            <SideBar/>
            <div className="ml-60 h-screen w-full px-24 pt-24 bg-gradient-to-r from-blue200 to-blue100">

                <div className='w-full bg-gradient-to-r from-blue200 to-blue100 rounded-md px-10 pt-6 py-2'>
                    <div className='flex align-center justify-between'>
                        <p className='font-dmSans text-light font-bold text-2xl'>Upcoming Birthdays</p>
                        <Button text={'ADD A BIRTHDAY'}
                                color={'text-light300'}
                                size={'h-10 w-36'}
                                font={'font-dmSans font-bold text-sm text-center'}
                                bg={'bg-light'}
                                padding={'px-2'}
                                onClick={() => {
                                }}
                        />
                    </div>
                    <BirthdayCard user={user}/>
                    <BirthdayCard user={user}/>
                    <BirthdayCard user={user}/>
                    <BirthdayCard user={user}/>
                    <BirthdayCard user={user}/>

                    <div className='w-full flex justify-end items-end'>
                        <Button text={'Next page'}
                                color={'text-light'}
                                size={'h-fit w-fit'}
                                font={'font-dmSans font-bold text-md text-end hover:underline'}
                                bg={'bg-clear'}
                                padding={'px-2'}
                                margin={'mt-4 mb-2'}
                                border={'none'}
                                onClick={() => {
                                }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
