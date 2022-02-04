import React from "react";
// import { View, StyleSheet, Text } from "react-native";
import { AiFillStar } from 'react-icons/Ai';

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
        <div style={styles.container}>
            <AiFillStar
                name={star >= 1 ? "star" : star >= 0.5 ? "star-half-o" : "star-o"}
            />
            <AiFillStar
                name={star >= 2 ? "star" : star >= 1.5 ? "star-half-o" : "star-o"}
            />
            <AiFillStar
                name={star >= 3 ? "star" : star >= 2.5 ? "star-half-o" : "star-o"}
            />
            <AiFillStar
                name={star >= 4 ? "star" : star >= 3.5 ? "star-half-o" : "star-o"}
            />
            <AiFillStar
                name={star >= 5 ? "star" : star >= 4.5 ? "star-half-o" : "star-o"}
            />
            <text>{star}</text>
        </div>
    );
};

const styles = {
    container: {
        // flexDirection: "row",
        // alignItems: "center",
    },
    star: {
        // marginRight: 4,
        // color: "tomato",
    },
    starText: {
        // color: "#000",
        // fontWeight: "bold",
    },
};