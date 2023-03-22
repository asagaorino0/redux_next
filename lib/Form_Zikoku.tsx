import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { addFormatDate, selectFormatDate } from '@/features/formatDateSlice';
import { store } from '@/app/store';
import { setReservableDateToReservable } from './firebase';
import { fetchReservable, fetchUsers } from './firebaseFetch';
import { addUser, selectUser } from '@/features/userSlice';
import { addReservableDate } from '@/features/reservableDateSlice';

export default function Form_Zikoku() {
    const formatDate = useSelector(selectFormatDate);
    const [shopUser, setShopUser] = useState<any>([]);
    const [reservableData, setReservableData] = useState<any>([]);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const inputChange_start = (event: any) => {
        const newValueStart = event.target.value
        dispatch(addFormatDate({
            start: `${newValueStart}`,
            end: formatDate.end,
            formatDate: formatDate.formatDate
        }))
        // console.log(formatDate.start, ':::', formatDate.end)
    }
    const inputChange_end = (event: any) => {
        const newValueEnd = event.target.value
        dispatch(addFormatDate({
            start: formatDate.start,
            end: `${newValueEnd}`,
            formatDate: formatDate.formatDate
        }))
        // console.log(formatDate.start, ':::', formatDate.end)
    }
    const fetchReservableData = async () => {
        const result = await fetchReservable()
        dispatch(addReservableDate(result))
        setReservableData(result)
    }
    const handleClickSetReservable = async () => {
        setReservableDateToReservable(formatDate, user.uid);
        fetchReservableData()
        const result = await fetchUsers()
        setShopUser(result)
        dispatch(addUser(shopUser))
        dispatch(addFormatDate({
            start: formatDate.start,
            end: formatDate.end,
            formatDate: "",
            value: !formatDate.value
        }))
    };

    return (
        <>
            <React.StrictMode >
                <Provider store={store}>
                    {formatDate.formatDate}
                    <div className="mt-32">
                        <input
                            id="time"
                            type="time"
                            defaultValue={`{infoValue}`}
                            onInput={inputChange_start}
                        />
                        <br />
                    </div>
                    <div>
                        <input
                            id="time"
                            type="time"
                            defaultValue={`{infoValue}`}
                            onInput={inputChange_end}
                        />
                        <br />
                    </div>
                    <br />
                    <br />
                    <button
                        onClick={handleClickSetReservable}
                    >
                        予約枠を保存
                    </button>
                    <br />
                </Provider>
            </React.StrictMode>
        </>
    );
}
