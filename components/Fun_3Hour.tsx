import { useDispatch } from 'react-redux';
// import '../styles/PageSetting.css';
// import '../styles/Calendar.css';



export const Fun_3Hour = ({
    e,
    // info,
}: {
    e: string;
    // info: string;
}) => {
    const dispatch = useDispatch();
    const clickDeleteAddYoyaku = () => {
        // dispatch(
        //     addPreYoyaku({
        //         zikan: '',
        //         yoyakuName: ''
        //     }))
        // dispatch(
        //     addPage({
        //         pageMenu: page.pageMenu,
        //         tomareId: page.tomareId,
        //         menu: '',
        //         page: '/',
        //         url: '/',
        //         expandedNaiyou: false
        //     }))
        // dispatch(addInput({
        //     yoyakuName: '',
        //     yoyakuZip: '',
        //     yoyakuAddress1: '',
        //     yoyakuAddress2: '',
        //     yoyakuAddress3: '',
        //     yoyakuTel: '',
        //     yoyakuNinzu: 0,
        //     // yoyakuzikoku: '',
        //     zikoku: ''
        // }))
        // dispatch(addMenu(
        //     {
        //         make: false,
        //         nail: false,
        //         este: false,
        //         aroma: false,
        //         hair: false,
        //         foot: false,
        //         count: 0,
        //         menu: '',
        //         yoyakuMenu: ''
        //     }
        // ));
    };
    const clickAddYoyaku = () => {
        clickDeleteAddYoyaku()
        // dispatch(
        //     addNext({
        //         next: false,
        //         nextGappi: '',
        //         nextZikan: '',
        //         uid: '',
        //         zikoku: `${e}`,
        //         yoyakuUid: '',
        //     })
        // );
    };

    return (
        <div>
            {/* {id && ( */}
            <>
                <div >

                    <h1>{`${e}`}
                        {
                            // `${next.zikoku}` !== `${e}` &&
                            <button
                                className="flex items-center p-1"
                                onClick={clickAddYoyaku}>
                                <span className="text-gray-900">◯</span>
                            </button>
                        }
                    </h1>
                    {/* < h3 > */}
                    {/* {
                            `${next.zikoku}` === `${e}` &&
                            next.cancel !== true &&
                            ( */}
                    <div>
                        {/* <Fun_4InputForm
                        // info={info}
                        // yoyakuMenu={menu}
                        /> */}
                        <br />
                        {/* <Fun_5Fin
                        // info={info}
                        // yoyakuMenu={yoyakuMenu}
                        /> */}
                    </div>
                    {/* )
                        } */}
                    {/* </h3> */}
                </div>
            </>
            {/* )
            } */}
        </div >
    );
};

