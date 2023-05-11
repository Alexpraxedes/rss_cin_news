import React from "react"; // Import react
import { TextInputProps } from "react-native"; // Import TextInputProps from react-native
import { Control, Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form"; // Import Control from react-hook-form
import { Container, Error } from "./styles"; // Import Container from ./styles
import { Input } from "../Input"; // Import Input from ../Input

interface Props extends TextInputProps {
    placeholderTextColor?: string;
    control: Control;
    name: string;
    error: string | undefined;
}

/**
 * Renders an input form component.
 *
 * @param {Props} control - the form control object.
 * @param {string} name - the name of the input field.
 * @param {string} error - the error message to display.
 * @param {...rest} rest - the additional props to pass to the input field.
 * @return {JSX.Element} - the input form component.
 */
export function InputForm({
    control,
    name,
    error,
    ...rest
}: Props) {
    return (
        <Container>
            <Controller
                control={control}
                render={
                    ({ field: { onChange, value } }) => (
                        <Input
                            placeholderTextColor="#969CB2"
                            onChangeText={onChange}
                            value={value}
                            {...rest}
                        />
                    )
                }
                name={name}
            />
            { error && <Error>{error}</Error> }
        </Container>
    );
}
