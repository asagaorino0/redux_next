import { store } from '@/app/store';
import { addFormatDate, selectFormatDate } from '@/features/formatDateSlice';
import { addReservableDate, selectReservableDate } from '@/features/reservableDateSlice';
import { addUser, selectUser } from '@/features/userSlice';
import { setReservableDateToReservable, setReservationDateToReservation } from '@/lib/firebase';
import { fetchReservable, fetchReservationTimeList, fetchUsers } from '@/lib/firebaseFetch';
import { ReservableDateStateType } from '@/types/ReservableDateStateType';
import { UserStateType } from '@/types/UserStateType';
import { format } from 'date-fns';
import Form_Calendar from 'lib/Form_Calendar';
import Form_Zikoku from 'lib/Form_Zikoku';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const formatDate = useSelector(selectFormatDate);
  const Fun_0Calendar = dynamic(() => import('../components/Fun_0Calendar'), { ssr: false });
  const App: any = dynamic(() => import('../src/App'), { ssr: false });
  const PageA: any = dynamic(() => import('../pages/PageA'), { ssr: false });
  const Login: any = dynamic(() => import('../components/Login'), { ssr: false });
  const Fun_0Pin = dynamic(() => import('../components/Fun_0Pin'), { ssr: false });
  const [reservableData, setReservableData] = useState<any>([]);
  const [shopUser, setShopUser] = useState<any>([]);
  const dispatch = useDispatch();
  const [reservationTime, setReservationTime] = useState<any>([]);
  const reservableDate = useSelector(selectReservableDate);
  const user = useSelector(selectUser);
  const fetchReservableData = async () => {
    const result = await fetchReservable()
    dispatch(addReservableDate(result))
    setReservableData(result)
    console.log(result, reservableDate)
  }
  const fetchShopUser = async () => {
    const result = await fetchUsers()
    setShopUser(result)
    dispatch(addUser(shopUser))
    console.log(user)
  }
  const fetchReservationTimeData = async () => {
    const result = await fetchReservationTimeList(formatDate, 'Uda1c6a4e5b348c5ba3c95de639e32414');
    setReservationTime(result);
    console.log(formatDate.formatDate)
    console.log(result, reservationTime)
  }
  useEffect(() => {
    fetchReservableData()
    fetchShopUser()
  }, []);
  const handleClickSetReservable = async () => {
    setReservableDateToReservable(formatDate, 'Uda1c6a4e5b348c5ba3c95de639e32414');
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
  const handleClicksetReservation = () => {
    setReservationDateToReservation(formatDate, 'Uda1c6a4e5b348c5ba3c95de639e32414', 'Uda1c6a4e5b348c5ba3c95de639e32414');
  };
  return (
    <Layout>
      <div className="pt-12">
        <div className="grid md:gap-6 mt-0 md:grid-cols-2 w-full mb-6">
          <React.StrictMode >
            <Provider store={store}>
              <div>
                <Form_Calendar />
                <br />
                {formatDate.formatDate}
                <br />
                <br />
                <Form_Zikoku />
                <br />
                <br />
                <button onClick={handleClickSetReservable}>
                  予約枠を保存
                </button>
                <br />
                <br />
                <button onClick={handleClicksetReservation}>
                  予約時間を保存
                </button>
                <br />
                {`${reservationTime}`.length !== 0 &&
                  reservationTime.map((time: any) => {
                    const start = format(new Date(time.startTime), "yyyy-MM-dd'T'HH:mm:ss")
                    return (
                      <>
                        {start}
                        <br />
                      </>
                    )
                  })}
                <br />
                {
                  `${reservableData}`.length !== 0 &&
                  reservableData.map((time: ReservableDateStateType) => {
                    return (
                      <> {time.reservableDate}
                        {
                          shopUser
                            .filter((user: UserStateType) => user.uid === `${time.shopUid}`)
                            .map((user: UserStateType) => {
                              return (
                                <img src={`${user.icon}`} alt="Icon" className="w-6 h-6 rounded-full" />
                              )
                            })
                        }
                      </>
                    )
                  })}
                <Fun_0Pin />
              </div>
            </Provider>
          </React.StrictMode>
          {/* <Todo /> */}
          <React.StrictMode >
            <Provider store={store}>
              {/* <Login /> */}
            </Provider>
          </React.StrictMode>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

