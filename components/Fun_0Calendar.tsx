
import { parseISO, format, addMinutes, parse } from "date-fns";
import Form_Calendar from "lib/Form_Calendar";
import Form_Zikoku from "lib/Form_Zikoku";
import { useEffect, useState } from "react";
import { addFormatDate, selectFormatDate } from '@/features/formatDateSlice';
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { fetchReservationTimeList } from "@/lib/firebaseFetch";
export default function Fun_0Calendar(
) {
    const formatDate = useSelector(selectFormatDate);
    const [reservableTime, setReservableTime] = useState<any>([]);
    const [reservationTime, setReservationTime] = useState<any>([]);
    const Fun_0Calendar = dynamic(() => import('components/Fun_0Calendar'), { ssr: false });
    const Fun_0Pin = dynamic(() => import('components/Fun_0Pin'), { ssr: false });
    //////////////////////////////////////////////////////////////////////////////////////////////
    const a = new Date('2018-09-01T06:00:00');
    const b = new Date('2018-09-01T07:00:00');
    const c = new Date('2018-09-01T08:00:00');
    const d = new Date('2018-09-01T09:00:00');

    b > a  // true
    b > b  // false
    b > c  // false

    b.getTime() === a.getTime()  // false
    b.getTime() === b.getTime()  // true
    b.getTime() === c.getTime()  // false

    b < a  // false
    b < b  // false
    b < c  // true

    b >= a  // true
    b >= b  // true
    b >= c  // false

    b <= a  // false
    b <= b  // true
    b <= c  // true

    b > a && b < c  // true
    c > a && c < b  // false
    // console.log(a < b && b < c && c < d)//true
    ///////////////////////////////////////////////////////////////////////////////////

    function echoTime(timestamp: string | number | Date) {
        let date = new Date(a);
        let options: any = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        // console.log(date.toLocaleDateString('ja-JP', options));///2018年9月1日(土) 6:00:00
        // console.log(a.toLocaleDateString('ja-JP', options));///2018年9月1日(土) 6:00:00
    }


    ///////////////////////////////////////////////////////////////////////////////////
    // const fetchReservationTimeData = async () => {
    //     const result = await fetchReservationTimeList(formatDate);
    //     setReservationTime(result);
    //     console.log(formatDate.formatDate)
    //     console.log(result)
    // }
    // useEffect(() => {
    //     fetchReservationTimeData()
    //     console.log(reservationTime)
    // }, []);
    interface Schedule {
        start: string;
        end: string;
    }
    type BitSchedule = Record<string, string>;
    function bitSchedule(schedules: Schedule[]): BitSchedule {
        const bitDays: BitSchedule = {};
        for (const schedule of schedules) {
            const { dateKey, dateBit } = changeBit(schedule);
            if (dateKey in bitDays) {
                bitDays[dateKey] = (BigInt(`0b${bitDays[dateKey]}`) | BigInt(`0b${dateBit}`)).toString(2);
            } else {
                bitDays[dateKey] = dateBit;
            }
        }
        return bitDays;
    }
    function changeBit(schedule: Schedule): { dateKey: string; dateBit: string } {
        let dateBit = '';
        const startDate = new Date(schedule.start);
        const endDate = new Date(schedule.end);
        const clockInTime = new Date(startDate).setHours(8, 0, 0, 0);
        const clockOutTime = new Date(startDate).setHours(20, 0, 0, 0);
        let checkDuration = new Date(clockInTime);
        for (let i = 0; i < 24; i++) {
            if (startDate <= checkDuration && checkDuration < endDate) {
                dateBit += '1';
            } else {
                dateBit += '0';
            }
            if (+checkDuration >= +clockOutTime) {
                break;
            }
            checkDuration = new Date(+checkDuration + 30 * 60 * 1000);
        }
        const dateKey = startDate.toISOString().split('T')[0];
        return { dateKey, dateBit };
    }

    const schedules: Schedule[] = [
        // { start: '2019-05-15T09:30:00', end: '2019-05-15T11:00:00' },
        // { start: '2019-05-15T10:30:00', end: '2019-05-15T12:00:00' },
        // { start: '2019-05-15T12:30:00', end: '2019-05-15T13:30:00' },
        // { start: '2019-05-15T15:30:00', end: '2019-05-15T16:30:00' },
        // { start: '2019-05-15T16:00:00', end: '2019-05-15T17:00:00' },
        // { start: '2019-05-16T10:00:00', end: '2019-05-16T11:00:00' },
        { start: '2019-05-16T10:30:00', end: '2019-05-16T11:30:00' },
        // formatDate &&
        // {
        //     start: `${formatDate.formatDate}`, end: `${formatDate.end}`
        // },
    ];
    const bitDays = bitSchedule(schedules);
    // console.log(bitDays);

    ///////////////////////////////////////////////////////////////////////////////////
    interface FreeTime {
        start: string;
        end: string;
    }
    interface FreeTimes {
        [date: string]: FreeTime[];
    }
    function backToDateTime(bitDays: { [date: string]: string }): FreeTimes {
        const freeTimes: FreeTimes = {};
        Object.keys(bitDays).forEach(date => {
            const dateBit = bitDays[date];
            const clockinTime = parseISO(date);
            const freeDurations: FreeTime[] = [];
            let start: Date | null = null;
            let end: Date | null = null;
            // for (let i = 0; i < dateBit.length; i++) {
            //     const bit = dateBit.charAt(i);
            //     if (!start) {
            //         if (bit === '0') {
            //             start = new Date(clockinTime.setHours(8, 0, 0, 0) + 30 * i * 60000);
            //             // console.log('start:', new Date(start.toISOString()).setHours(10, 0, 0, 0));
            //         }
            //     } else {
            //         if (bit === '1' || i === dateBit.length - 1) {
            //             if (bit === '1') {
            //                 end = new Date(clockinTime.getTime() + 30 * i * 60000);
            //             } else {
            //                 end = new Date(clockinTime.getTime() + 30 * (i + 1) * 60000);
            //             }
            //             // console.log('end:', end.toISOString());
            //             freeDurations.push({
            //                 start: format(start, "yyyy-MM-dd'T'HH:mm:ss"),
            //                 end: format(end, "yyyy-MM-dd'T'HH:mm:ss")
            //             });
            //             start = null;
            //             end = null;
            //         }
            //     }
            // }
            // freeTimes[date] = freeDurations;
            // console.log(clockinTime, freeDurations)
        });
        return freeTimes;
    }
    setReservableTime(backToDateTime(bitDays));
    // console.log(reservableTime)





    ///////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            {/* <Form_Calendar /> */}
            {/* <div className="w-schedule js-tabs js-w-schedule" data-w-schedule-timeline="09:00-18:00"> */}
            {/* <form action="sample-input-type.php" method="post" target="_blank"> */}
            <p>
                <label>
                    <Form_Zikoku />
                </label>
            </p>
            {/* <Fun_0Calendar /> */}
            {/* <Fun_0Pin /> */}
        </>
    );
}
