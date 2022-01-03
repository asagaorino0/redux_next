import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
    const monthItem = [
        { id: 1, day: "20220111", e: 'work' },
        { id: 2, day: "20220122", e: 'hangout' },
        { id: 3, day: "20211224", e: 'Christmas Eve' },
        { id: 4, day: "20211225", e: 'Christmas' },
    ],
        getTileContent = (props, calendar, element) => {


            let year = props.date.getFullYear();
            let month = props.date.getMonth() + 1;
            let day = props.date.getDate();
            month = ('0' + month).slice(-2);
            day = ('0' + day).slice(-2);
            const formatDate = year + month + day;
            // console.log(formatDate)

            if (props.view !== "month") {
                return null;
            }
            return (
                <p >
                    {/* <br /> */}
                    {
                        monthItem
                            // .filter((formatDate, data) => formatDate === "20220111")
                            .map((data) => {
                                if (formatDate === data.day) {
                                    return (
                                        <tr key={data.id}>
                                            {/* <td>
                          {data.day}
                        </td> */}
                                            <td>
                                                {data.e}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                    }
                    <br />
                    {/* {formatDate} */}
                </p>
            );
        };

    const clickDay = (calendar) => {
        let year = calendar.getFullYear();
        let month = calendar.getMonth() + 1;
        let day = calendar.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        alert(formatDate)
    }

    return (
        <div>
            <h1>Hello StackBlitz!</h1>
            <div >
                <h2>XXX</h2>
            </div>
            <div >
                <Calendar
                    locale={"ja-JP"}
                    value={new Date()}
                    tileContent={getTileContent}
                    calendarType={"US"}
                    prev2Label={null}
                    // next2Label={null}
                    onClickDay={clickDay}
                />
            </div>
        </div>
    );
}