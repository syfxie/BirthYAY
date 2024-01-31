import * as React from "react";

import Button from '../../components/UI/Button'
import SideBar from "../../components/SideBar";
import GiftCard from "../../components/GiftCard";

export default function Gifts() {
    console.log('Sophie gift page');

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
        <div className='min-h-screen bg-background flex justify-center items-center'>
            <SideBar/>

            <div className="px-10 py-20 sm:ml-64">
                <div className='flex sm:flex-col md:flex-col lg:flex-row align-center justify-between mr-4'>
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


                <div className='flex flex-wrap gap-2'>
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                </div>

                <div className='w-full flex justify-end items-end'>
                    <Button text={'Next page'}
                            color={'text-navy'}
                            size={'h-fit w-fit'}
                            font={'font-dmSans font-bold text-md text-end hover:underline'}
                            bg={'bg-clear'}
                            padding={'px-2'}
                            margin={'my-4 mr-4'}
                            onClick={() => {
                            }}
                    />
                </div>
            </div>
        </div>
    );
}
