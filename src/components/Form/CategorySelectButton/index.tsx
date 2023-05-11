import React, { useState } from "react";
import {
    Container,
    Category,
    Icon
} from "./styles";

interface CategorySelectProps {
    title: string;
    onPress: () => void;
}

/**
 * Renders a button component for selecting a category.
 *
 * @param {object} CategorySelectProps - An object containing the props for the button.
 * @param {string} CategorySelectProps.title - The title of the category to display on the button.
 * @param {function} CategorySelectProps.onPress - The function to execute when the button is pressed.
 * @return {JSX.Element} A button component for selecting a category.
 */
export function CategorySelectButton({ title, onPress }: CategorySelectProps) {
    return (
        <Container onPress={onPress}>
            <Category>{title}</Category>
            <Icon name="chevron-down" />
        </Container>
    );
};