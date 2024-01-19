import * as React from "react";

import Button from '../../components/UI/Button'
import SideBar from "../../components/SideBar";
import GiftCard from "../../components/GiftCard";
import BirthdayCard from "../../components/BirthdayCard";

export default function Dashboard() {
    console.log('Sophie dashboard');

    const user = {
        email: 'email@gmail.com',
        username: 'username',
        firstName: 'firstname',
        lastName: 'lastname',
        birthday: 'birthday',
        age: 20
    }

    const gift = {
        name: 'Teddy Bear',
        price: 20.99,
        starred: false,
        receiver: user
    }

    return(
        <div className='flex min-h-screen bg-background items-center justify-center'>
            <SideBar/>

            <div className="p-4 sm:ml-64">
                <p className='text-lg mb-10 mt-5'>Welcome back, Billy</p>

                <div className='mb-10'>
                    <p className='text-xl'>My Gifts</p>
                    <div className='flex flex-wrap gap-5 justify-center'>
                        <GiftCard gift={gift} deleteGift={() => {
                        }}/>
                        <GiftCard gift={gift} deleteGift={() => {
                        }}/>
                        <GiftCard gift={gift} deleteGift={() => {
                        }}/>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='flex align-center justify-between'>
                        <p className='text-xl'>Upcoming Birthdays</p>
                        <Button text={'ADD A BIRTHDAY'}
                                color={'text-gray100'}
                                size={'h-5 w-fit'}
                                font={'text-xs text-center'}
                                bg={'bg-white'}
                                padding={'px-2'}
                                onClick={() => {}}
                        />
                    </div>
                    <BirthdayCard user={user}/>
                    <BirthdayCard user={user}/>
                    <BirthdayCard user={user}/>
                    <BirthdayCard user={user}/>
                    <BirthdayCard user={user}/>
                </div>
            </div>
        </div>

    )
}
