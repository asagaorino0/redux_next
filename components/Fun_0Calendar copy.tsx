import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';
import isSameDay from 'date-fns/isSameDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isSameMonth from 'date-fns/isSameMonth';

// import Paper from '@material-ui/core/Paper';
// import { addTargetTomare, selectTargetTomare } from '../features/targetTomareSlice';

// import { PreTomareStateType } from '../types/PreTomareStateType';
// import '../styles/Calendar.css';
// import '../styles/PageSetting.css';
import {
    getCalendarArray,
} from '../styles/CalendarStyleSheet';
// import {
//     fetchPreTomareGroup,
//     fetchPreTomareGroupDate
// } from '../lib/firebaseFetch';
// import { selectNext } from '../features/nextSlice';
// import { selectPage } from '../features/pageSlice';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { addFormatDate, selectFormatDate } from '@/features/formatDateSlice';
// import { addMenu, selectMenu } from '../features/menuSlice';
// import { selectUser } from '../features/userSlice';
// import { addInput, selectInput } from '../features/inputSlice';
// import { addPreTomare, selectPreTomare } from '@/features/preTomareSlice';


export default function Fun_0Calendar(
) {
    const dispatch = useDispatch();
    const [targetDate, setTargetDate] = useState(new Date());
    const [preTomareDate, setPreTomareDate] = useState<any>([]);
    const calendar = getCalendarArray(targetDate);
    const today = new Date();
    const [tomare, setTomare] = useState<any>([]);
    const formatDate = useSelector(selectFormatDate);
    // const preTomare = useSelector(selectPreTomare);
    // const page = useSelector(selectPage);
    // const next = useSelector(selectNext);
    // const user = useSelector(selectUser);
    // const menu = useSelector(selectMenu);
    // const input = useSelector(selectInput);


    // const fetchPreTomareGroupeData = async () => {
    //     const result = await fetchPreTomareGroup(next.uid)
    //     setTomare(result)
    //     dispatch(addTargetTomare(result))
    // }
    // const fetchPreTomareGroupeDateData = async () => {
    //     const result = await fetchPreTomareGroupDate(next.uid)
    //     setPreTomareDate(result)
    // }
    // useEffect(() => {
    //     fetchPreTomareGroupeData()
    //     fetchPreTomareGroupeDateData()
    //     // {
    //     //     formatDate.formatMonth &&
    //     //         setTargetDate(formatDate.formatMonth)
    //     // }
    // }, [next, page, formatDate]);
    const grid: React.CSSProperties = {
        border: '0px',
        marginTop: '10px',
        paddingBottom: '1px',
        backgroundColor: '#fafafa',
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        alignContent: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

    const pink = ['rgba(252, 197, 217, 1)', 'rgba(250, 153, 180, 1)', 'rgba(247, 100, 131, 1)', 'rgba(227, 51, 113, 1)', 'rgba(194, 24, 91, 1)', 'rgba(155, 0, 70, 1)', 'rgba(128, 0, 60, 1)',];
    const CalendarTableCell = (props: any) => {
        const { wday, isTargetMonth, isToday, children, ...other } = props;
        return (
            <td
                className={`px-1 max-w-49 border-l-0 border-r-0 border-t-0 transform scale-100 m-0 ${isToday ? 'bg-pink-50' : 'bg-transparent'
                    } table-cell text-center border-b border-gray-300`}
                {...other}
            >
                {children}
            </td>
        );
    };
    ///////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <div style={grid} className="flex flex-wrap justify-between content-stretch">
                {/* <Grid container className="grid" > */}
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
                            {format(targetDate, 'y年M月?')}
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
                                        let str0 = preTomareDate;
                                        let str1 = `${clickDate}`;
                                        const handleClickDay = (() => {
                                            dispatch(
                                                addFormatDate({
                                                    formatDate: `${clickDate}`,
                                                    formatMonth: date,
                                                    template: true,
                                                    editMode: true,
                                                    bDate: date,
                                                })
                                            );
                                            // dispatch(
                                            //     addMenu({
                                            //         make: false,
                                            //         nail: false,
                                            //         este: false,
                                            //         aroma: false,
                                            //         hair: false,
                                            //         foot: false
                                            //     })
                                            // );
                                            // dispatch(
                                            //     addInput({
                                            //         yoyakuZip: user.yoyakuZip,
                                            //         yoyakuName: user.yoyakuName,
                                            //         yoyakuAddress1: user.yoyakuAddress1,
                                            //         yoyakuAddress2: user.yoyakuAddress2,
                                            //         yoyakuAddress3: user.yoyakuAddress3,
                                            //         yoyakuTel: user.yoyakuTel,
                                            //         yoyakuUid: user.uid,
                                            //         yoyakuIcon: user.icon,
                                            //         uid: next.uid,
                                            //     })
                                            // )
                                            console.log(formatDate
                                            );
                                        });

                                        const cancelClickDay = () => {
                                            dispatch(
                                                addFormatDate({
                                                    formatDate: "",
                                                    formatMonth: formatDate.formatMonth,
                                                })
                                            );
                                        };

                                        return (
                                            <CalendarTableCell
                                                key={getDay(date)}
                                                wday={getDay(date)}
                                                isTargetMonth={isSameMonth(date, targetDate)}
                                                isToday={isSameDay(date, today)}
                                                align="center"
                                                width="auto"
                                                position="relative"
                                                height="48px"
                                            >
                                                <button
                                                    className="button"
                                                    onClick={() => handleClickDay()}
                                                >
                                                    {getDate(date)}
                                                </button>
                                                {str0.indexOf(str1) === -1 &&
                                                    clickDate !== formatDate.formatDate ?
                                                    (
                                                        <div>
                                                            <button
                                                                className="buttonCalendarS"
                                                                onClick={() => handleClickDay()} />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <button
                                                                className="bg-pink-300 w-3 h-3 rounded-full hover:bg-pink-400 focus:outline-none focus:bg-pink-400 transition-all duration-150 ease-in-out"
                                                                onClick={() => cancelClickDay()} />
                                                        </div>)
                                                    //  :
                                                    // tomare
                                                    //     .filter((preTomare: PreTomareStateType) => preTomare.gappi === `${clickDate}`)
                                                    //     .map((preTomare: any) => {
                                                    //         return (
                                                    //             <div key={preTomare.uid}>
                                                    //                 {
                                                    //                     preTomare.nextGappi &&
                                                    //                         preTomare.nextId === "" ?
                                                    //                         (
                                                    //                             <PlaylistAddCircleIcon
                                                    //                                 sx={{
                                                    //                                     color: '#d81b60'
                                                    //                                 }}
                                                    //                                 onClick={() => alert("リクエスト検討中")}
                                                    //                             />
                                                    //                         ) : (
                                                    //                             <button
                                                    //                                 className="button"
                                                    //                                 onClick={() => {
                                                    //                                     dispatch(
                                                    //                                         addPreTomare(preTomare))
                                                    //                                     handleClickDay()
                                                    //                                 }}
                                                    //                             >
                                                    //                                 <img src={preTomare.icon} alt="shopIcon" className="IconM" />
                                                    //                             </button>
                                                    //                         )
                                                    //                 }
                                                    //                     </div>
                                                    //                 );
                                                    //             })
                                                }
                                            </CalendarTableCell>
                                        );
                                    }
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
            {/* <div className="w-schedule js-tabs js-w-schedule" data-w-schedule-timeline="09:00-18:00"> */}
            <form action="sample-input-type.php" method="post" target="_blank">
                <p>
                    <label>
                        時間入力欄：
                        <input type="time" name="sampleName" step="900" />
                    </label>
                </p>
                <p>
                    <input type="submit" />
                </p>
            </form>
            {/* </div> */}
        </>
    );
}
