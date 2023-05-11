import React, { useContext } from "react"; // Importing React
import {
    Container,
    Header,
    Title,
    Footer,
    Category,
    Icon,
    Date
} from "./styles"; // Importing the styled components
import { categories } from "../../utils/categories"; // Importing the categories object
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation from @react-navigation/native
import { NewsContext } from "../../context/NewsContext"; // Importing the NewsContext
import { FeedProps } from "../../screens/Feed";

interface Props {
    data: FeedProps;
}
 
/**
 * Sets categoryModalOpen to true, indicating that the SelectCategoryModal is open.
 */
export function FeedCard({ data }: Props) {
    const { setSelectedNews } = useContext(NewsContext);

    const [category] = categories.filter(
        item => item.key === data.category
    );

    /**
     * Sets the selected news and navigates to the FeedNewsDetails screen
     *
     * @param {FeedProps} data - The feed data to be displayed in the details screen
     */
    const { navigate } = useNavigation();
    function handleNavigateToFeedNewsDetails( data : FeedProps) {
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
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}