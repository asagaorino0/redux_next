// import { TomareStateType } from '../types/TomareStateType';
// import { Box } from '../styles/CalendarStyleSheet';
import { useDispatch, useSelector } from 'react-redux';
// import { selectTargetTomare } from '../features/targetTomareSlice';
// import '../styles/Calendar.css';
// import { selectInput } from '../features/inputSlice';
// import { selectMenu } from '../features/menuSlice';
// import { selectNext } from '../features/nextSlice';
// import { selectPage } from '../features/pageSlice';
import { addFormatDate, selectFormatDate } from '@/features/formatDateSlice';
import Fun_2TimeBox from './Fun_2TimeBox';
// import { addPreTomare, selectPreTomare } from '@/features/preTomareSlice';
// import Fun_1Card from './Fun_1Card';

// interface PreTomareData extends TomareStateType {
//     tomareId: string;
// }

export default function Fun_0Pin(): JSX.Element {
    // const [preTomareData, setPreTomareData] = useState<PreTomareData[]>([]);
    const formatDate = useSelector(selectFormatDate);
    // const targetTomare = useSelector(selectTargetTomare);
    // const page = useSelector(selectPage);
    // const next = useSelector(selectNext);
    // const preTomare = useSelector(selectPreTomare);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     setPreTomareData(targetTomare.targetTomare);
    // }, [targetTomare]);

    // useEffect(() => {
    //     const filteredPreTomareData = preTomareData.filter((preTomare: PreTomareData) => preTomare.gappi === `${formatDate.formatDate}`);
    //     filteredPreTomareData.forEach((preTomare: PreTomareData) => {
    //         dispatch(addPreTomare(preTomare));
    //     });
    // }, [preTomareData, formatDate, page, dispatch]);

    // const isPreTomareEmpty = preTomare.length === 0;

    const handleEventIconClick = () => {
        dispatch(addFormatDate({
            formatDate: '',
            // formatMonth: formatDate.formatMonth,
            // bDate: formatDate.bDate
        }));
    };

    return (
        // isPreTomareEmpty ? (
        // <>
        //     <p>
        //         {formatDate.formatDate}
        //         は予約可能ではありません。
        //         <br />
        //         他の日時を選択してください。
        //         <br />
        //     </p>
        //     <EventIcon
        //         onClick={handleEventIconClick}
        //     />
        //     <br />
        //     <br />
        // </>
        // ) : (
        <> <br />
            <div className="bg-gray-100 text-center  grid flex-not justify-center items-center">
                <br />
                {/* {preTomare.map((preTomare: PreTomareData) => (
                    <section
                        key={preTomare.id}
                        id={preTomare.tomareId}
                    > */}
                <Fun_2TimeBox />
                {/* </section> */}
                {/* ))} */}
            </div></>
        // )
    );
}
