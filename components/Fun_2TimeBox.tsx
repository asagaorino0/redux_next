import { useDispatch, useSelector } from 'react-redux';
import { selectFormatDate } from '@/features/formatDateSlice';
// import '../styles/Calendar.css';
import {
    Fun_3Hour,
} from './Fun_3Hour';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Form_Zikoku from 'lib/Form_Zikoku';
import { format, parseISO } from 'date-fns';

export default function Fun_2TimeBox() {
    const formatDate = useSelector(selectFormatDate);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    // ///////////////////////////////////////////////////////
    // interface Schedule {
    //     start: string;
    //     end: string;
    // }
    // type BitSchedule = Record<string, string>;
    // function bitSchedule(schedules: Schedule[]): BitSchedule {
    //     const bitDays: BitSchedule = {};
    //     for (const schedule of schedules) {
    //         const { dateKey, dateBit } = changeBit(schedule);
    //         if (dateKey in bitDays) {
    //             bitDays[dateKey] = (BigInt(`0b${bitDays[dateKey]}`) | BigInt(`0b${dateBit}`)).toString(2);
    //         } else {
    //             bitDays[dateKey] = dateBit;
    //         }
    //     }
    //     return bitDays;
    // }
    // function changeBit(schedule: Schedule): { dateKey: string; dateBit: string } {
    //     let dateBit = '';
    //     const startDate = new Date(schedule.start);
    //     const endDate = new Date(schedule.end);
    //     const clockInTime = new Date(startDate).setHours(8, 0, 0, 0);
    //     const clockOutTime = new Date(startDate).setHours(20, 0, 0, 0);
    //     let checkDuration = new Date(clockInTime);
    //     for (let i = 0; i < 24; i++) {
    //         if (startDate <= checkDuration && checkDuration < endDate) {
    //             dateBit += '1';
    //         } else {
    //             dateBit += '0';
    //         }
    //         if (+checkDuration >= +clockOutTime) {
    //             break;
    //         }
    //         checkDuration = new Date(+checkDuration + 30 * 60 * 1000);
    //     }
    //     const dateKey = startDate.toISOString().split('T')[0];
    //     return { dateKey, dateBit };
    // }
    // const schedules: Schedule[] = [
    //     formatDate &&
    //     {
    //         start: `${formatDate.start}`, end: `${formatDate.end}`
    //     },
    // ];
    // const bitDays = bitSchedule(schedules);
    // interface FreeTime {
    //     start: string;
    //     end: string;
    // }
    // interface FreeTimes {
    //     [date: string]: FreeTime[];
    // }
    // function backToDateTime(bitDays: { [date: string]: string }): FreeTimes {
    //     const freeTimes: FreeTimes = {};
    //     Object.keys(bitDays).forEach(date => {
    //         const dateBit = bitDays[date];
    //         const clockinTime = parseISO(date);
    //         const freeDurations: FreeTime[] = [];
    //         let start: Date | null = null;
    //         let end: Date | null = null;
    //         for (let i = 0; i < dateBit.length; i++) {
    //             const bit = dateBit.charAt(i);
    //             if (!start) {
    //                 if (bit === '0') {
    //                     start = new Date(clockinTime.setHours(8, 0, 0, 0) + 30 * i * 60000);
    //                     console.log('start:', new Date(start.toISOString()).setHours(10, 0, 0, 0));
    //                 }
    //             } else {
    //                 if (bit === '1' || i === dateBit.length - 1) {
    //                     if (bit === '1') {
    //                         end = new Date(clockinTime.getTime() + 30 * i * 60000);
    //                     } else {
    //                         end = new Date(clockinTime.getTime() + 30 * (i + 1) * 60000);
    //                     }
    //                     console.log('end:', end.toISOString());
    //                     freeDurations.push({
    //                         start: format(start, "yyyy-MM-dd'T'HH:mm:ss"),
    //                         end: format(end, "yyyy-MM-dd'T'HH:mm:ss")
    //                     });
    //                     start = null;
    //                     end = null;
    //                 }
    //             }
    //         }
    //         freeTimes[date] = freeDurations;
    //     });
    //     return freeTimes;
    // }
    // console.log(backToDateTime(bitDays), formatDate);
    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <>
                {/* モーダル */}
                {open &&
                    <Transition.Root show={open} as={Fragment}>
                        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            {/* <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"> */}
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                                <div className="sm:flex sm:items-start">
                                                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                </div> */}
                                                    <div className="mt-1 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">

                                                        </Dialog.Title>
                                                        <div className="mt-1">
                                                            <Form_Zikoku />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                    onClick={() => setOpen(false)}
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                                <br /><br />
                                                {/* <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                Deactivate
                                            </button> */}
                                                {/* <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button> */}
                                                <br /><br />
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>}
            </>
            <div>
                <div className="m-3 shadow-non min-h-screen:non">
                    <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <Fun_3Hour
                            e={'8'} />
                    </button>
                    <br />
                    <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <Fun_3Hour
                            e={'9'} />
                    </button>
                    <br />
                    <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <Fun_3Hour
                            e={'10'} />
                    </button>
                    <br />
                    <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <Fun_3Hour
                            e={'11'} />
                    </button>
                    <br />
                    <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <Fun_3Hour
                            e={'12'} />
                    </button>
                    <br />
                    <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <Fun_3Hour
                            e={'13'} />
                    </button>
                    <br />

                    <Fun_3Hour
                        e={'14'} /><br />

                    <Fun_3Hour
                        e={'15'} /><br />

                    <Fun_3Hour
                        e={'16'} /><br />

                    <Fun_3Hour
                        e={'17'} /><br />

                    <Fun_3Hour
                        e={'18'} /><br />

                    <Fun_3Hour
                        e={'19'} />
                    <br />

                    <Fun_3Hour
                        e={'20'} />
                </div>
            </div></>
    );
}

