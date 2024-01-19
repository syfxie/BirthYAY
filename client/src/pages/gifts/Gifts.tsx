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

            <div className="px-40 py-20 sm:ml-64">
                <div className='flex align-center justify-between'>
                    <p className='text-xl'>My Gifts</p>

                    <Button text={'ADD A GIFT'}
                            color={'text-white'}
                            size={'h-10 w-fit'}
                            font={'text-xs text-center font-semibold'}
                            bg={'bg-lightBlue'}
                            padding={'px-8'}
                            onClick={() => {
                            }}
                    />
                </div>


                <div className='flex flex-wrap gap-5 justify-between'>
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
                    <GiftCard gift={gift} deleteGift={() => {
                    }}/>
                </div>
            </div>
        </div>
    );
}
