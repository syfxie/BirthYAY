import React, {useEffect, useState} from 'react';
import {Gift, User} from "../types/types";

type editGiftCardProps = {
    gift: Gift;
    deleteGift: () => void;
}

export default function EditGiftCard({gift, deleteGift}: editGiftCardProps){
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [starred, setStarred] = useState(false);
    const [receiver, setReceiver] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const labelClassName = 'block text-sm font-medium leading-6 text-black';
    const inputClassName = 'pl-2 mb-8 block w-full rounded-sm border-2 py-1.5 bg-white text-black shadow-sm placeholder:text-gray-400 font-dmSans focus:border-navy';

    const update = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // validate form

        // call API to update gift
    }

    useEffect(() => {
        if (gift) {
            setName(gift.name);
            setPrice(gift.price || 0);
            setStarred(gift.starred);
            setReceiver(gift.receiver|| null);
        }
    }, [gift]);

    return(
        <div className="flex justify-center items-center w-full h-screen pb-24 bg-light">
            <div className="sm:w-6/12 md:w-4/12 min-w-96 bg-white xs:px-8 py-12 md:p-12 rounded-md shadow-gray-300 shadow-md">
                <p className="self-center text-2xl font-bold font-poppins whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue300 to-cyan100">
                    Edit Gift
                </p>

                <hr className='border-b-gray-200 border-1 mb-8'/>

                <form className='space-y-2' onSubmit={update}>
                    <div>
                        <label
                            htmlFor='name'
                            className={labelClassName}
                        >
                            Name*
                        </label>

                        <div className='mt-2'>
                            <input
                                id='name'
                                name='name'
                                type='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete='number'
                                required
                                className={inputClassName}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='price'
                            className={labelClassName}
                        >
                            Price
                        </label>

                        <div className='mt-1'>
                            <input
                                id='price'
                                name='price'
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                                autoComplete='number'
                                className={inputClassName}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='receiver'
                            className={labelClassName}
                        >
                            Receiver
                        </label>

                        <div className='mt-1'>
                            <select id="receiver"
                                    name="receiver"
                                    value={receiver ? receiver.firstName : 'None'}
                                    onChange={(e) => {}}
                            >
                                <option value=''>Sophie Xie</option>
                                <option value=''>Ella Stoch</option>
                                <option value=''>Brian King</option>
                                <option value=''>None</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='starred'
                            className={labelClassName}
                        >
                            Starred
                        </label>

                        <div className='mt-1'>
                            <input type="checkbox"
                                   id="starred"
                                   name="starred"
                                   checked={starred}
                                   onChange={(e) => setStarred(e.target.checked)}
                                   className={labelClassName}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row gap-6'>
                        <button type='submit'
                                className='mt-8 flex w-full justify-center rounded-md bg-gradient-to-r from-blue200 to-blue100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500'
                        >
                            Create
                        </button>

                        <button type='button'
                                className='mt-8 flex w-full justify-center rounded-md bg-gradient-to-r from-navy to-blue200 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500'
                                onClick={() => {}}
                        >
                            Cancel
                        </button>
                    </div>

                    {errorMessage ?
                        <p className='text-red-600 text-sm'>{errorMessage}</p>
                        :
                        null
                    }
                </form>
            </div>
        </div>
    );
}
