import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import weekday from 'dayjs/plugin/weekday'
import vi from 'dayjs/locale/vi'

dayjs.locale(vi)
dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(weekday)