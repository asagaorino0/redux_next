import React from "react";
// import { View, StyleSheet, Text } from "react-native";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import styles from '../styles/Home.module.css'

type Props = {
    star: number;
    starSize?: number;
    textSize?: number;
};

export const Stars: React.FC<Props> = ({
    star,
    starSize = 16,
    textSize = 14,
}: Props) => {
    const starStyle = [styles.star, { fontSize: starSize }];
    return (
        <div className={styles.grid}>

            {star >= 1 && <BsStarFill />}
            {star == 0 && <BsStar />}
            {star >= 2 && <BsStarFill />}
            {star <= 1 && <BsStar />}
            {star >= 3 && <BsStarFill />}
            {star <= 2 && <BsStar />}
            {star >= 4 && <BsStarFill />}
            {star <= 3 && <BsStar />}
            {star >= 5 && <BsStarFill />}
            {star <= 4 && <BsStar />}


            <text>{star}</text>
        </div>
    );
};

// const styles = {
//     container: {
//         // flexDirection: "row",
//         // alignItems: "center",
//     },
//     star: {
//         // marginRight: 4,
//         // color: "tomato",
//     },
//     starText: {
//         // color: "#000",
//         // fontWeight: "bold",
//     },
// };