import React from "react"; // Import react
import { TextInputProps } from "react-native"; // Import TextInputProps from react-native
import { Control, Controller } from "react-hook-form"; // Import Control from react-hook-form
import { Container, Input, Error } from "./styles"; // Import Container from ./styles

interface Props extends TextInputProps{
    textAlignVertical: 'top' | 'bottom' | 'center' | undefined ;
    placeholderTextColor?: string;
    multiline? : boolean;
    control: Control;
    name: string;
    error: string | undefined;
};

/**
 * Renders an abstract input area with optional error message.
 *
 * @param {string} placeholderTextColor - color of input placeholder
 * @param {string} textAlignVertical - vertical alignment of input text
 * @param {boolean} multiline - if input should support multiple lines
 * @param {any} control - react-hook-form controller object
 * @param {string} name - name of input
 * @param {string} error - optional error message to display
 * @param {...any} rest - any additional props to spread onto input component
 * @returns {JSX.Element} - the InputAbstractarea component
 */
export function InputAbstractarea({ 
    placeholderTextColor,
    textAlignVertical,
    multiline,
    control,
    name,
    error,
     ...rest
} : Props ) {
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
};