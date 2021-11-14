import dayjs, {Dayjs} from "dayjs";
import {nonBusinessDays} from "../constants/error";

const DATE_FORMAT = 'YYYY-MM-DD';

const getNextBusinessDate = (date: Dayjs) => {
    const nextDay = date.add(1, 'days');
    if (nonBusinessDays.includes(nextDay.get('days'))) {
        return date.add(1, 'week').startOf('week').add(1, 'day')
    }
    return nextDay;
}

export const getDatesPaymentTakenNow = () => {
    const currentDate = dayjs();
    const nextBusinessDay = getNextBusinessDate(currentDate);
    return [currentDate.format(DATE_FORMAT), nextBusinessDay.format(DATE_FORMAT)]
}
