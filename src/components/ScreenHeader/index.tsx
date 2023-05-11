import React from "react"; // Importing React
import { 
    Container,
    Header,
    Title
} from "./styles"; // Importing the styled components

interface Props {
    title: string;
};

/**
 * Renders a screen header component with the given title.
 *
 * @param {Props} title - the title to be displayed in the header
 * @return {JSX.Element} - the screen header component
 */
export function ScreenHeader({ title }: Props) {
    return (
        <Container>
            <Header>
                <Title>{title}</Title>
            </Header>
        </Container>
    );
};