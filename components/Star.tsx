import React from "react";
// import { View, StyleSheet, Text } from "react-native";
import { AiFillStar } from "react-icons/ai";

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
                name={star >= 1 ? "AiFillStar" : star >= 0.5 ? "star-half-o" : "AiOutlineStar"}
            />
            <AiFillStar
                name={star >= 2 ? "AiFillStar" : star >= 1.5 ? "star-half-o" : "AiOutlineStar"}
            />
            <AiFillStar
                name={star >= 3 ? "AiFillStar" : star >= 2.5 ? "star-half-o" : "AiOutlineStar"}
            />
            <AiFillStar
                name={star >= 4 ? "AiFillStar" : star >= 3.5 ? "star-half-o" : "AiOutlineStar"}
            />
            <AiFillStar
                name={star >= 5 ? "AiFillStar" : star >= 4.5 ? "star-half-o" : "AiOutlineStar"}
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