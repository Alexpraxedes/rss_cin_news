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
 
export function FeedNewsCard({ data }: Props) {
    const { setSelectedNews } = useContext(NewsContext);

    const [category] = categories.filter(
        item => item.key === data.category
    );

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