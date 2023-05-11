import React, { useContext } from "react"; // Importing React
import { 
    Container,
    Header,
    Title,
    Footer,
    TextAbstract
} from "./styles"; // Importing the styled components
import { categories } from "../../utils/categories"; // Importing the categories object
import { FeedContext } from "../../context/FeedContext"; // Importing the FeedContext
import { Linking } from "react-native"; // Importing the Linking

export function NewsCard( { data }: any ) {
    const { selectedFeed } = useContext(FeedContext);
    const [category] = categories.filter(
        item => item.key === selectedFeed?.category
    );

    const dateString = data.published;
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const parts = dateString.split(" ");
    const day = parts[1];
    const month = months.indexOf(parts[2]) + 1;
    const year = parts[3];
    const time = parts[4];

    const dateFormatted = `${day.padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

    function handleNavigateToNews( url : string) {
        Linking.openURL(url);
    };

    return (
        <Container 
            color={category?.color}
            onPress={() => handleNavigateToNews(data.id)} 
        >
            <Header>
                <Title>{data.title}</Title>
            </Header>
            
            <Footer>
                <TextAbstract color={category?.color}>{data.summary}</TextAbstract>
                <TextAbstract color={category?.color}>{dateFormatted}</TextAbstract>
            </Footer>
        </Container>
    );
}