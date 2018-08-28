import moment from 'moment';

const getRelativeDate = (momentDate) => {
    const today = moment();
    const date = moment(momentDate);
    const numberDaysAgo = today.diff(date, 'days');
    
    if(numberDaysAgo <= 6 && numberDaysAgo > 0)
        return date.calendar();
    if(numberDaysAgo == 0)
        return date.fromNow();

    return date.format("LL");
}

export {
    getRelativeDate
}