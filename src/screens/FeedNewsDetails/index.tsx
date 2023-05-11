import React, { useContext } from "react"; // Importing React
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation from @react-navigation/native
import { Alert } from "react-native"; // Importing AsyncStorage from react-native
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing the AsyncStorage library

import { categories } from "../../utils/categories"; // Importing the categories object
import { FeedNew, NewsContext } from "../../context/NewsContext"; // Importing the NewsContext
import { 
    Container,
    Content,
    Title,
    Image,
    InfoContainer,
    Category,
    TextCategory,
    Icon,
    Text,
    Date,
    Actions,
    Button, 
    IconActions
} from "./styles"; // Importing the styled components
import { ScreenHeader } from "../../components/ScreenHeader"; // Importing the ScreenHeader componentcomponent

/**
 * Renders the details of a news feed item.
 *
 * @return {JSX.Element} A JSX Element that renders the news feed item details UI.
 */
export function FeedNewsDetails( ) {
    const { selectedNews, setSelectedNews } = useContext(NewsContext);

    const { navigate } = useNavigation();

    const [category] = categories.filter(
        item => item.key === selectedNews?.category
    );

    /**
     * Sets the selected news and navigates to the FeedNewsEdit screen.
     *
     * @param {FeedNew} data - The data for the selected news.
     */

    function handleNavigateToFeedNewsEdit( data : FeedNew) {
        setSelectedNews(data);
        navigate('FeedNewsEdit' as never);
    }

    /**
     * Deletes a feed news item from AsyncStorage and navigates to the Feed screen.
     *
     * @param {FeedNew} selectedNews - The news item to be deleted.
     */
    const dataKey = '@rss_cin_news:news';
    async function handleDeleteFeedNews(selectedNews : FeedNew) {
        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFiltered = currentData.filter(
                (item: FeedNew) => item.id !== selectedNews?.id
            );

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFiltered));
            navigate('Feed' as never);
        }
        catch (error) {
            console.log(error);
            Alert.alert('Não foi possível deletar a notícia');
        }
    }
    
    return (
        <Container>
            <ScreenHeader title='Detalhes da notícia' />
            <Content>
                <Title color={category?.color}>{selectedNews?.title}</Title>
                <Date>{selectedNews?.date}</Date>
                <Image source={{ uri: selectedNews?.image }}/>
                <InfoContainer>
                    <Category>
                        <Icon 
                            name={category?.icon}
                            color={category?.color}
                        />
                        <TextCategory color={category?.color} >{category?.name}</TextCategory>
                    </Category>
                    <Actions>
                        <Button
                            onPress={() => handleNavigateToFeedNewsEdit(selectedNews!)}
                        >
                            <IconActions name="edit" />
                        </Button>
                        <Button
                            onPress={() => handleDeleteFeedNews(selectedNews!)}
                        >
                            <IconActions name="trash" />
                        </Button>
                    </Actions>
                </InfoContainer>
                <Text>{selectedNews?.text}</Text>
            </Content>
        </Container>
    );
}