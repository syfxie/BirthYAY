import * as React from 'react';

import Button from './UI/Button'

import {User} from "../types/types";
import {calculateUpcomingAge, formatFullName} from '../utils/helpers/userHelpers'

type BirthdayCardProps = {
    user: User;
}

export default function BirthdayCard({user}:BirthdayCardProps) {
    return (
        <div className={"w-full min-h-20 rounded-md mt-5 flex flex-wrap items-center justify-between pr-4 pl-4 mb-0 bg-white shadow-md"}>
            <div className='w-8/12 flex flex-wrap items-center justify-between'>
                <img className='w-10 h-10 rounded-3xl mx-4'
                     src="/purplepink.jpeg"
                     alt="Profile Photo"
                />

                <div className='w-48 mr-4'>
                    <p className='text-black'>{formatFullName(user)}</p>
                    <p className='text-darkGray'>{user.username}</p>
                </div>

                <div className='md:w-6/12 flex md:flex-row sm:flex-col justify-between items-center'>
                    <p className='w-2/12 text-darkGray text-center'>{user.birthday}</p>
                    <p className='w-2/12 text-darkGray text-center'>{user.age}</p>

                    <Button text={'20 Days'}
                            size={'h-10 w-30'}
                            color={'text-white'}
                            font={'text-sm font-bold'}
                            bg={'bg-lightBlue'}
                            disabled={true}
                    />
                </div>
            </div>

            <Button text={'Gift Planned'}
                    color={'text-green'}
                    size={'h-10 w-24'}
                    font={'text-xs'}
                    bg={'bg-lightGreen'}
                    disabled={true}
            />
        </div>
    );
}
