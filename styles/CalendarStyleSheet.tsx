import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfWeek from 'date-fns/endOfWeek';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

export const getCalendarArray = (date: any) => {
    const sundays = eachWeekOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date),
    });
    return sundays.map((sunday: any) =>
        eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
    );
};

export const grid: React.CSSProperties = {
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
};

export const CalendarTableCell = (props: any) => {
    const { wday, isTargetMonth, isToday, children, ...other } = props;
    return (
        <td
            className={`px-1 max-w-49 border-l-0 border-r-0 border-t-0 transform scale-100 m-0 align-top
            ${isToday ? 'bg-pink-100' : 'bg-transparent'}
             table-cell text-center border-b border-gray-300 focus:bg-pink-50`}
            {...other}
        >
            {children}
        </td>
    );
};
