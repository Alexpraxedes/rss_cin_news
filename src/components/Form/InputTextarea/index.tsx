import React from "react"; // Import react
import { TextInputProps } from "react-native"; // Import TextInputProps from react-native
import { Control, Controller} from "react-hook-form"; // Import Control from react-hook-form
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
 * Renders an Input Textarea component with a Controller and optional error message.
 *
 * @param {object} props - The component props.
 * @param {string} props.placeholderTextColor - The color of the placeholder text.
 * @param {string} props.textAlignVertical - The vertical alignment of the text.
 * @param {boolean} props.multiline - Whether the input should allow multiple lines of text.
 * @param {object} props.control - The React Hook Form control object.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.error - The error message to display, if any.
 * @param {object} props.rest - Additional props to pass to the Input component.
 * @return {JSX.Element} - The rendered Input Textarea component.
 */
export function InputTextarea({ 
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