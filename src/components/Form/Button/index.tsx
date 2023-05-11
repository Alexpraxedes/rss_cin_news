import React from "react"; // Importing React
import { RectButtonProps } from "react-native-gesture-handler"; // Importing the RectButtonProps interface from react-native-gesture-handler
import { Container, Title } from "./styles"; // Importing the styled components

interface Props extends RectButtonProps{
    title: string;
    onPress: () => void;
}
/**
 * Renders a button component with the given title and onPress function, and any 
 * additional props passed via the spread operator.
 *
 * @param {Object} props - The props object containing the title, onPress, and any 
 * additional props.
 * @param {string} props.title - The title text to display on the button.
 * @param {Function} props.onPress - The function to execute when the button is 
 * pressed.
 * @returns {JSX.Element} - The rendered button component.
 */
export function Button({ title, onPress, ...rest }: Props) {
    return (
        <Container onPress={onPress} {...rest}>
            <Title>{title}</Title>
        </Container>
    );
};