import React from "react";
import { TextInputProps } from "react-native";
import {
    Container
} from "./styles";

interface Props extends TextInputProps{
    placeholderTextColor?: string;
};

/**
 * Renders an input component.
 *
 * @param {string} placeholderTextColor - The color of the input placeholder text.
 * @param {Props} rest - The remaining props to be spread on the Container component.
 * @return {JSX.Element} - A React component that renders an input element.
 */
export function Input({ placeholderTextColor, ...rest} : Props ) {
    return (
        <Container { ...rest} />
    );
};