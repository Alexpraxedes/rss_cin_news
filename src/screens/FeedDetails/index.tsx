import React, { useContext, useEffect, useState } from "react"; // Importing React
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation from @react-navigation/native
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing the AsyncStorage library
import { ActivityIndicator, Alert } from "react-native"; // Importing AsyncStorage from react-native
import { useTheme } from "styled-components"; // Importing the useTheme hook from styled-components

import { 
    Container,
    Content,
    Image,
    InfoContainer,
    Category,
    TextCategory,
    Icon,
    Date,
    Actions,
    Text,
    NewsCards,
    Button, 
    LoadContainer,
    IconActions
} from "./styles"; // Importing the styled components
import { ScreenHeader } from "../../components/ScreenHeader"; // Importing the ScreenHeader componentcomponent
import { FeedContext, getRssFeed } from "../../context/FeedContext"; // Importing the FeedContext
import { NewsCard } from "../../components/NewsCard"; // Importing the NewsCard component
import { categories } from "../../utils/categories"; // Importing the categories object
import { FeedProps } from "../Feed"; // Importing the FeedProps interface

export function FeedDetails( ) {
    const [isLoading, setIsLoading] = useState(true);
    const { selectedFeed, setSelectedFeed } = useContext(FeedContext);
    const [rss, setRss] = useState<any>([]);
    const { navigate } = useNavigation();
    const [category] = categories.filter(
        item => item.key === selectedFeed?.category
    );
    setSelectedFeed(selectedFeed);
    function handleNavigateToFeedNewsEdit( data : FeedProps) {
        setSelectedFeed(data);
        navigate('FeedEdit' as never);
    }

    const dataKey = '@rss_cin_news:feed';
    async function handleDeleteFeedNews(selectedFeed : FeedProps) {
        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFiltered = currentData.filter(
                (item: FeedProps) => item.id !== selectedFeed?.id
            );

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFiltered));
            navigate('Feed' as never);
        }
        catch (error) {
            console.log(error);
            Alert.alert('Não foi possível deletar a notícia');
        }
    }

    const getRss = async () => {
        const rssValue = await getRssFeed(selectedFeed?.urlFeed!);
        setRss(rssValue.items);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        getRss();
    }, [selectedFeed]);
    
    return (
        <Container>
            <ScreenHeader title={selectedFeed?.title ? selectedFeed?.title : ""} />
            <Content>
                <Date>Feed atualizado em: {selectedFeed?.date }</Date>
                <Image source={{ uri: selectedFeed?.image }}/>
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
                            onPress={() => handleNavigateToFeedNewsEdit(selectedFeed!)}
                        >
                            <IconActions name="edit" />
                        </Button>
                        <Button
                            onPress={() => handleDeleteFeedNews(selectedFeed!)}
                        >
                            <IconActions name="trash" />
                        </Button>
                    </Actions>
                </InfoContainer>
                <Text>{selectedFeed?.description}</Text>

                { 
                    isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={category?.color ? category?.color : useTheme().colors.primary}
                            size="large"
                        />
                    </LoadContainer> :

                    <NewsCards
                        data={rss}
                        keyExtractor={(item: any) => item.id}
                        renderItem={({ item } : any) => (
                            <NewsCard 
                                color={category?.color}
                                data={item} 
                            />
                        )}
                    />
                }
            </Content>
        </Container>
    );
}