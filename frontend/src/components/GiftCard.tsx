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
        <div className={"h-60 w-72 rounded-md mt-5 flex flex-col items-center justify-center px-5 py-3 bg-white shadow-md"}>
            <div className='h-3/6 w-full flex flex-col bg-lightBlue justify-between items-stretch px-3 py-2 rounded-md'>
                <p className='text-4xl font-bold text-white'>{gift.name}</p>
                <p className='text-white text-end'>{gift.price}</p>
            </div>

            <div className='w-full flex items-end'>

                <div className='w-full mt-5'>
                    <p className='text-xs mb-2'>Receiver</p>

                    <div className='flex items-center'>
                        <img className='w-10 h-10 mr-4 rounded-3xl'
                             src="/purplepink.jpeg"
                             alt="Profile Photo"
                        />

                        <div className='mr-4'>
                            <p className='text-black'>{gift.receiver ? formatFullName(gift.receiver) : 'Who\'s the lucky one?'}</p>
                            <p className='text-darkGray'>{gift.receiver?.username}</p>
                        </div>
                    </div>

                    <div className='flex gap-1 justify-end'>
                        <Button text={'Edit'}
                                color={'text-green'}
                                size={'h-5 w-fit'}
                                font={'text-xs text-center'}
                                bg={'bg-lightGreen'}
                                padding={'px-2'}
                                onClick={() => console.log('Sophie edit gift')}
                        />

                        <Button text={'Delete'}
                                color={'text-red'}
                                size={'h-5 w-fit'}
                                font={'text-xs text-center'}
                                bg={'bg-lightRed'}
                                padding={'px-2'}
                                onClick={deleteGift}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

