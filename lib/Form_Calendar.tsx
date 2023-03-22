import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';
import isSameDay from 'date-fns/isSameDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isSameMonth from 'date-fns/isSameMonth';
import { addFormatDate, selectFormatDate } from '@/features/formatDateSlice';
import { addUser, selectUser } from '@/features/userSlice';
import { addReservableDate, selectReservableDate } from '@/features/reservableDateSlice';
import { ReservableDateStateType } from '@/types/ReservableDateStateType';
import { UserStateType } from '@/types/UserStateType';
import { CalendarTableCell, getCalendarArray, grid } from '../styles/CalendarStyleSheet';
import { fetchReservable, fetchUsers } from './firebaseFetch';
import { selectCurrentNavigation } from '@/features/currentNavigationSlice';

export default function Form_Calendar(
) {
    const dispatch = useDispatch();
    const reservableDate = useSelector(selectReservableDate);
    const user = useSelector(selectUser);
    const currentNavigation = useSelector(selectCurrentNavigation)
    const [targetDate, setTargetDate] = useState(new Date());
    const calendar = getCalendarArray(targetDate);
    const today = new Date();
    const formatDate = useSelector(selectFormatDate);
    const [reservableData, setReservableData] = useState<any>([]);
    const [shopUser, setShopUser] = useState<any>([]);
    const fetchReservableData = async () => {
        const result = await fetchReservable()
        dispatch(addReservableDate(result))
        setReservableData(result)
        // console.log(result, reservableDate)
    }
    const fetchShopUser = async () => {
        const result = await fetchUsers()
        setShopUser(result)
        dispatch(addUser(shopUser))
        // console.log(user)
    }
    useEffect(() => {
        {
            currentNavigation.name === 'Reservable' &&
                fetchReservableData()
            fetchShopUser()
        }
    }, [
        formatDate,
        currentNavigation.name
    ]);

    return (
        <>{currentNavigation.name}
            <div style={grid} className="flex flex-wrap justify-between content-stretch">
                <div>
                    <button
                        className="button"
                        onClick={() => setTargetDate(subMonths(targetDate, 1))}
                    >
                        ＜
                    </button>
                </div>
                <div>
                    <span
                        onClick={() => setTargetDate(new Date())}
                        className="yearmonth">
                        <h3>
                            {format(targetDate, 'y年M月')}
                        </h3>
                    </span>
                </div>
                <div>
                    <button
                        className="button"
                        onClick={() => setTargetDate(addMonths(targetDate, 1))}
                    >
                        ＞
                    </button>
                </div>

                <div className="border-0 m-0 shadow-none text-center pb-0 justify-center ">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">日</th>
                                <th className="px-4 py-2">月</th>
                                <th className="px-4 py-2">火</th>
                                <th className="px-4 py-2">水</th>
                                <th className="px-4 py-2">木</th>
                                <th className="px-4 py-2">金</th>
                                <th className="px-4 py-2">土</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendar.map((weekRow: any, rowNum: number) => (
                                <tr key={rowNum}>
                                    {weekRow.map((date: any) => {
                                        const Y = date.getFullYear();
                                        const M = ('00' + (date.getMonth() + 1)).slice(-2);
                                        const D = ('00' + date.getDate()).slice(-2);
                                        const clickDate = Y + '-' + M + '-' + D;
                                        const handleClickDay = (() => {
                                            dispatch(
                                                addFormatDate({
                                                    formatDate: `${clickDate}`,
                                                    start: formatDate.start,
                                                    end: formatDate.end
                                                })
                                            );
                                            console.log(formatDate);
                                        });

                                        const cancelClickDay = () => {
                                            dispatch(
                                                addFormatDate({
                                                    formatDate: "",
                                                    // formatMonth: formatDate.formatMonth,
                                                })
                                            );
                                        };

                                        return (
                                            <CalendarTableCell
                                                key={getDay(date)}
                                                wday={getDay(date)}
                                                isTargetMonth={isSameMonth(date, targetDate)}
                                                isToday={isSameDay(date, today)}
                                                text-align="top"
                                                width="auto"
                                                position="flex"
                                                height="58px"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => handleClickDay()}
                                                >
                                                    {getDate(date)}
                                                </button>
                                                {
                                                    clickDate !== formatDate.formatDate ?
                                                        (
                                                            `${reservableData}`.length !== 0 &&
                                                            reservableData.map((time: ReservableDateStateType) => {
                                                                return (
                                                                    <>
                                                                        {
                                                                            shopUser
                                                                                .filter((user: UserStateType) => user.uid === `${time.shopUid}`)
                                                                                .map((user: UserStateType) => {
                                                                                    let reservableDate = time.reservableDate
                                                                                    return (
                                                                                        <div key={time.reservableDateId} >
                                                                                            {reservableDate === clickDate &&
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="rounded-full bg-pink-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-900"
                                                                                                    onClick={() => {
                                                                                                        // dispatch(
                                                                                                        //     addPreTomare(preTomare))
                                                                                                        // handleClickDay()
                                                                                                    }}
                                                                                                >
                                                                                                    <img
                                                                                                        src={`${user.icon}`}
                                                                                                        alt="Icon"
                                                                                                        width={24}
                                                                                                        height={24}
                                                                                                        className="rounded-full m-0"
                                                                                                    />
                                                                                                </button>
                                                                                            }
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                        }

                                                                    </>
                                                                )
                                                            }
                                                            )
                                                        ) : (
                                                            <div className='text-red-300'>
                                                                <button
                                                                    className="bg-pink-300 w-3 h-3 rounded-full hover:bg-pink-400 focus:outline-none focus:bg-pink-400 transition-all duration-150 ease-in-out"
                                                                    onClick={() => cancelClickDay()} />
                                                                🔵
                                                            </div>
                                                        )
                                                }
                                            </CalendarTableCell>)
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </>
    );
}
