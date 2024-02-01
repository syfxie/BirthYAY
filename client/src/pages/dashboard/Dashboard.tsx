import React from "react";
import Button from '../../components/UI/Button'
import SideBar from "../../components/SideBar";
import GiftCard from "../../components/GiftCard";
import BirthdayCard from "../../components/BirthdayCard";

export default function Dashboard() {
    console.log('Sophie dashboard');

    const user1 = {
        email: 'email@gmail.com',
        username: 'happihappi',
        firstName: 'Ella',
        lastName: 'Stoch',
        birthday: 'January 20',
        age: 28
    }

    const user2 = {
        email: 'email@gmail.com',
        username: 'sophiexxie',
        firstName: 'Sophie',
        lastName: 'Koi',
        birthday: 'March 20',
        age: 20
    }

    const user3 = {
        email: 'email@gmail.com',
        username: 'bbbbing',
        firstName: 'Brian',
        lastName: 'King',
        birthday: 'January 12',
        age: 16
    }

    const gift1 = {
        name: 'Teddy Bear',
        price: 20.99,
        starred: false,
        receiver: user1
    }

    const gift2 = {
        name: 'Mug',
        price: 12.50,
        starred: false,
        receiver: user1
    }

    const gift3 = {
        name: 'Gold Watch',
        price: 220.89,
        starred: false,
        receiver: user3
    }

    const gift4 = {
        name: 'Snacks',
        starred: false,
        receiver: user3
    }

    return(
        <div className='flex min-h-screen bg-background items-center justify-center'>
            <SideBar/>

            <div className="p-12 sm:ml-64 w-full">
                <p className='text-lg text-light100 font-semibold mb-10'>Welcome back, Billy</p>

                <div className='mb-12'>
                    <div className='flex align-center justify-between'>
                        <p className='font-dmSans text-2xl font-bold text-navy'>My Gifts</p>
                        <Button text={'ADD A GIFT'}
                                color={'text-light'}
                                size={'h-10 w-36'}
                                font={'font-dmSans font-bold text-md text-center'}
                                bg={'bg-gradient-to-r from-blue200 to-blue100'}
                                padding={'px-2'}
                                onClick={() => {
                                }}
                        />
                    </div>
                    <div className='flex flex-wrap gap-3 justify-start'>
                        <GiftCard gift={gift1} deleteGift={() => {
                        }}/>
                        <GiftCard gift={gift2} deleteGift={() => {
                        }}/>
                        <GiftCard gift={gift3} deleteGift={() => {
                        }}/>
                        <GiftCard gift={gift4} deleteGift={() => {
                        }}/>
                    </div>
                    <div className='w-full flex justify-end items-end'>
                        <Button text={'View all'}
                                color={'text-navy'}
                                size={'h-fit w-fit'}
                                font={'font-dmSans font-bold text-md text-end hover:underline'}
                                bg={'bg-clear'}
                                padding={'px-2'}
                                margin={'mt-4 mb-0'}
                                onClick={() => {
                                }}
                        />
                    </div>
                </div>

                <div className='w-full bg-gradient-to-r from-blue200 to-blue100 rounded-md px-10 pt-6 py-2'>
                    <div className='flex align-center justify-between'>
                        <p className='font-dmSans text-light font-bold text-2xl'>Upcoming Birthdays</p>
                        <Button text={'ADD A BIRTHDAY'}
                                color={'text-light300'}
                                size={'h-10 w-36'}
                                font={'font-dmSans font-bold text-sm text-center'}
                                bg={'bg-light'}
                                padding={'px-2'}
                                onClick={() => {}}
                        />
                    </div>
                    <BirthdayCard user={user1}/>
                    <BirthdayCard user={user2}/>
                    <BirthdayCard user={user3}/>
                    {/*<BirthdayCard user={user}/>*/}
                    {/*<BirthdayCard user={user}/>*/}

                    <div className='w-full flex justify-end items-end'>
                        <Button text={'View all'}
                                color={'text-light'}
                                size={'h-fit w-fit'}
                                font={'font-dmSans font-bold text-md text-end hover:underline'}
                                bg={'bg-clear'}
                                padding={'px-2'}
                                margin={'mt-4 mb-2'}
                                border={'none'}
                                onClick={() => {}}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
