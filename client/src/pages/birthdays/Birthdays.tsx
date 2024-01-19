import * as React from "react";

import Button from '../../components/UI/Button'
import SideBar from "../../components/SideBar";
import BirthdayCard from "../../components/BirthdayCard";

export default function Birthday() {
    console.log('Sophie birthday page');

    const user = {
        email: 'email@gmail.com',
        username: 'username',
        firstName: 'firstname',
        lastName: 'lastname',
        birthday: 'birthday',
        age: 20
    }

    return(
        <div className='flex min-h-screen bg-background items-center justify-center'>
            <SideBar/>

            <div className="w-full px-24 sm:ml-64">
                <div className='w-full'>
                    <div className='flex align-center justify-between'>
                        <p className='text-xl'>Upcoming Birthdays</p>

                        <Button text={'ADD A BIRTHDAY'}
                                color={'text-white'}
                                size={'h-10 w-fit'}
                                font={'text-xs text-center font-semibold'}
                                bg={'bg-lightBlue'}
                                padding={'px-8'}
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
