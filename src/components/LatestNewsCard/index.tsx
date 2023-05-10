import React, { useContext } from "react"; // Importing React
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation from @react-navigation/native
import { 
    Container,
    Title,
    Footer,
    Icon,
    DateContainer,
    Date,
    Image
} from "./styles"; // Importing the styled components
import { categories } from "../../utils/categories"; // Importing the categories object
import { FeedProps } from "../../screens/Feed"; // Importing the FeedProps interface
import { FeedContext } from "../../context/FeedContext"; // Importing the FeedContext

interface Props {
    data: FeedProps;
}

export function LatestNewsCard( { data }: Props ) {
    const { setSelectedFeed } = useContext(FeedContext);
    const [category] = categories.filter(
        item => item.key === data.category
    );

    const { navigate } = useNavigation();
    function handleNavigateToFeedNewsDetails( data : FeedProps) {
        setSelectedFeed(data);
        navigate('FeedDetails' as never);
    }

    return (
        <Container onPress={() => handleNavigateToFeedNewsDetails(data)} >
            <Image source={{ uri: data.image}} />
            <Icon color={category.color} name={category.icon} />
            
            <Footer>
                <Title color={category.color}>{data.title}</Title>
                <DateContainer>
                    <Date>{data.date}</Date>
                </DateContainer>
            </Footer>
        </Container>
    );
}
