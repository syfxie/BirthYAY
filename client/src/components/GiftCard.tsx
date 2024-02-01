import * as React from 'react';
import {useState} from 'react';

import Button from './UI/Button'
import {Gift} from "../types/types";
import {formatFullName} from "../utils/helpers/userHelpers";

type giftCardProps = {
    gift: Gift;
    deleteGift: () => void;
}

export default function GiftCard({gift, deleteGift}: giftCardProps){
    const [openModal, setOpenModal] = useState(false);

    return(
        <div className={"h-64 max-w-80 min-w-72 rounded-md mt-5 flex flex-col items-center justify-center px-4 py-8 bg-white shadow-md"}>
            <div className='bg-gradient-to-r from-blue200 to-blue100 h-3/6 w-full min-h-24 flex flex-col justify-between items-stretch px-3 py-2 rounded-md'>
                <p className='font-dmSans text-4xl font-bold text-light'>{gift.name}</p>
                <p className='font-dmSans text-light text-end'>{gift.price ? `$ ${gift.price}` : ''}</p>
            </div>

            <div className='w-full flex items-end'>
                <div className='w-full mt-5'>
                    <p className='font-dmSans text-navy text-sm mb-2'>Receiver</p>

                    <div className='flex items-center'>
                        <img className='w-10 h-10 mr-4 rounded-3xl'
                             src="/purplepink.jpeg"
                             alt="Profile Photo"
                        />

                        <div className='mr-4'>
                            <p className='font-dmSans font-medium text-navy'>{gift.receiver ? formatFullName(gift.receiver) : 'Who\'s the lucky one?'}</p>
                            <p className='font-dmSans text-lightGray text-md'>{gift.receiver?.username}</p>
                        </div>
                    </div>

                    <div className='flex gap-1 justify-end mt-4'>
                        <Button text={'Edit'}
                                color={'text-green'}
                                size={'h-6 w-fit'}
                                font={'font-dmSans font-bold text-xs text-center'}
                                bg={'bg-lightGreen'}
                                padding={'px-3'}
                                onClick={() => console.log('Sophie edit gift')}
                        />

                        <Button text={'Delete'}
                                color={'text-red'}
                                size={'h-6 w-fit'}
                                font={'font-dmSans font-bold text-xs text-center'}
                                bg={'bg-lightRed'}
                                padding={'px-3'}
                                margin={'ml-1'}
                                onClick={deleteGift}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
