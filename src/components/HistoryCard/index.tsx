import React from "react"; // Importing React and useState hook from react package

import { 
    Container,
    Title,
    Amount
} from "./styles"; // Importing the styled components

interface Props {
    title: string;
    amount: string;
    color: string;
};

/**
 * Renders a history card component with a given title, amount, and color.
 *
 * @param {string} title - The title of the history card.
 * @param {number} amount - The amount displayed on the history card.
 * @param {string} color - The color of the history card.
 * @return {JSX.Element} A history card component with the specified properties.
 */
export function HistoryCard({ title, amount, color }: Props) {
    return (
        <Container color={color}>
            <Title>{title}</Title>
            <Amount>{amount}</Amount>
        </Container>
    );
};