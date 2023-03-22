import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { addReservableDate } from "@/features/reservableDateSlice";
import { fetchReservable } from "@/lib/firebaseFetch";
const PageD = () => {
    // const PagePay = dynamic(() => import('../src/PagePay'), { ssr: false });
    // const Fun_0Calendar = dynamic(() => import('components/Fun_0Calendar'), { ssr: false });
    // const Fun_0Pin = dynamic(() => import('components/Fun_0Pin'), { ssr: false });
    // const user = useSelector(selectUser);
    const router = useRouter()
    // const [menus, setMenus] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const dispatch = useDispatch();
    const toHome = () => { router.push('./') }


    useEffect(() => {
        fetchReservableData()
        console.log('tomare:', tomare)
    }, []);
    const fetchReservableData = async () => {
        const result = await fetchReservable()
        dispatch(addReservableDate(result))
        setTomare(result)
    }
    const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
    return (
        <>
            <div>
                {/* <Fun_0Calendar />
                <Fun_0Pin /> */}
            </div>
        </>
    );
};
export default PageD;

