import {User} from "../../types/types";

export function formatFullName(aUser : User) {
    let returnValue = '';

    if (aUser && aUser.firstName) {
        if(aUser.lastName){
            returnValue = aUser.firstName + ' ' + aUser.lastName;
        }
        else {
            returnValue = aUser.firstName;
        }
    }
    return returnValue;
}

// export function passwordIsValid(aPassword: string){
//     let numberRegex = /^(.*\d.*)$/;
//     let symbolRegex = /^(.*\W.*)$/;
//     let lowerCaseRegex = /^(.*[a-z].*)$/;
//     let upperCaseRegex = /^(.*[A-Z].*)$/;
//
//     return (aPassword.length >= 8)
//             && (numberRegex.test(aPassword)
//             && symbolRegex.test(aPassword)
//             && lowerCaseRegex.test(aPassword)
//             && upperCaseRegex.test(aPassword))
// }

// Returns an object with the user's next birthday, days until then, and their upcoming age
export function calculateUpcomingAge(aUser: User) {
    const today: Date = new Date();
    const birthday: Date = new Date(aUser.birthday);
    let nextBirthday: Date = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    // Determine if this year's birthday has passed
    if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
    }

    // number of milliseconds in a day
    const oneDay = (1000 * 60 * 60 * 24);

    let daysUntilNextBirthday: number = Math.ceil((nextBirthday.getTime() - today.getTime()) / oneDay);
    let upcomingAge = nextBirthday.getFullYear() - birthday.getFullYear();
    // nextBirthday = nextBirthday.toString().slice(4, 15);

    const nextBirthdayString = nextBirthday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });


    return { nextBirthday: nextBirthdayString, daysUntilNextBirthday: daysUntilNextBirthday, upcomingAge: upcomingAge };
}

