import React, { useContext } from "react"; // Importing React
import {
    Container,
    Header,
    Title,
    Footer,
    Category,
    Icon,
    TextAbstract,
    Date
} from "./styles"; // Importing the styled components
import { categories } from "../../utils/categories"; // Importing the categories object
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation from @react-navigation/native
import { NewsContext } from "../../context/NewsContext"; // Importing the NewsContext

export interface FeedNewsCardProps {
    id: string;
    title: string;
    image: string;
    abstract: string;
    text: string;
    category: string;
    date: string;
    color: string;
}

interface Props {
    data: FeedNewsCardProps;
}
 
/**
 * Renders a news card with title, category, abstract, and date. 
 *
 * @param {Object} data - The data object containing information about the news. 
 * @param {string} data.title - The title of the news. 
 * @param {string} data.category - The category of the news. 
 * @param {string} data.abstract - The abstract of the news. 
 * @param {string} data.date - The date of the news. 
 * 
 * @returns {JSX.Element} A React component representing the news card. 
 */
export function FeedNewsCard({ data }: Props) {
    const { setSelectedNews } = useContext(NewsContext);

    const [category] = categories.filter(
        item => item.key === data.category
    );

    /**
     * Sets the selected news and navigates to the FeedNewsDetails screen.
     *
     * @param {FeedNewsCardProps} data - The data for the selected news.
     */
    const { navigate } = useNavigation();
    function handleNavigateToFeedNewsDetails( data : FeedNewsCardProps) {
        setSelectedNews(data);
        navigate('FeedNewsDetails' as never);
    }

    return (
        <Container 
            color={category.color}
            onPress={() => handleNavigateToFeedNewsDetails(data)}
        >
            <Header>
                <Title color={category.color}>{data.title}</Title>
                <Category>
                    <Icon color={category.color} name={category.icon}/>
                </Category>
            </Header>
            
            <Footer>
                <TextAbstract>{data.abstract}</TextAbstract>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}