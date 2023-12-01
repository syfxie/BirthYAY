
export function formatFullName(aUser) {
    let returnValue = '';

    if (aUser && aUser.first_name) {
        if(aUser.last_name){
            returnValue = aUser.first_name + ' ' + aUser.last_name;
        }
        else {
            returnValue = aUser.first_name;
        }
    }
    return returnValue;
}

export function passwordIsValid(aPassword){
    let numberRegex = /^(.*\d.*)$/;
    let symbolRegex = /^(.*\W.*)$/;
    let lowerCaseRegex = /^(.*[a-z].*)$/;
    let upperCaseRegex = /^(.*[A-Z].*)$/;

    return (aPassword.length >= 8)
            && (numberRegex.test(aPassword)
            && symbolRegex.test(aPassword)
            && lowerCaseRegex.test(aPassword)
            && upperCaseRegex.test(aPassword))
}

// Returns an object with the user's next birthday, days until then, and their upcoming age
export function calculateUpcomingAge(aUser) {
    const today = new Date();
    const birthday = new Date(aUser.birthday);
    let nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    // Determine if this year's birthday has passed
    if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
    }

    // number of milliseconds in a day
    const one_day = (1000 * 60 * 60 * 24);

    let daysUntilNextBirthday = Math.ceil((nextBirthday - today) / one_day);
    let upcomingAge = nextBirthday.getFullYear() - birthday.getFullYear();
    nextBirthday = nextBirthday.toString().slice(4, 15);

    return { nextBirthday: nextBirthday.toString(), daysUntilNextBirthday: daysUntilNextBirthday, upcomingAge: upcomingAge };
}

