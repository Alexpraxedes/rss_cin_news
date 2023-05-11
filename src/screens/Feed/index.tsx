import React, { useCallback, useState } from "react"; // Importing React, useEffect and useState
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // Importing the useFocusEffect hook from @react-navigation/native
import { ActivityIndicator, Alert } from "react-native"; // Importing the ActivityIndicator component from react-native
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing the AsyncStorage library
import uuid from "react-native-uuid"; // Importing uuid from react-native-uuid
import { useTheme } from "styled-components"; // Importing the useTheme hook from styled-components // Importing useNavigation from @react-navigation/native

import { LatestNewsCard } from "../../components/LatestNewsCard"; // Importing the HighlightCard component
import { FeedNewsCard, FeedNewsCardProps } from "../../components/FeedNewsCard"; // Importing the TransactionCard component
import {
  Container, 
  Header, 
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  LatestNewsContainer,
  TitleLatest,
  LatestNewsCards,
  NewsContainer,
  Title,
  NewstList,
  LogoutButton,
  LoadContainer
} from "./styles"; // Importing the styled components
import { Button } from "../../components/Form/Button"; // Importing the Button component
import { rssFeeds, RssFeedProps } from "../../utils/feed"; // Importing the RssFeedProps interface and rssFeeds object from utils/feed

export interface DataListProps extends FeedNewsCardProps {
  id: string;
}

export interface FeedProps extends RssFeedProps {
  id: string,
  date: string,
}

/**
 * The Feed component is responsible for rendering the user's news feed. 
 * It retrieves news data from AsyncStorage and formats it for rendering. 
 * It also allows the user to remove all news portals and add new ones.
 *
 * @return {JSX.Element} The rendered Feed component
 */
export function Feed() {  
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [feedNews, setFeedNews] = useState<DataListProps[]>([]);

  const [feedRssNews, setFeedRssNews] = useState<FeedProps[]>([]);
  const [restoreRssNews, setRestoreRssNews] = useState<FeedProps[]>([]);

  /**
   * Asynchronously loads the user's news feed from local storage and sorts the
   * feed by date. Formats dates as "dd/mm/yy" using Brazilian Portuguese
   * locale. Sets the formatted news feed and feed to state and sets isLoading
   * to false when done.
   */
  async function loadFeedNews() {
    const dataNews = '@rss_cin_news:news';
    const response = await AsyncStorage.getItem(dataNews);
    const feedNews = response ? JSON.parse(response) : [];

    feedNews.sort((a: DataListProps, b: DataListProps) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const newsFormatted: DataListProps[] = feedNews.map((item: DataListProps) => {
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        title: item.title,
        abstract: item.abstract,
        category: item.category,
        text: item.text,
        image: item.image,
        date
      }
    }); 
    setFeedNews(newsFormatted);

    const dataFeed = '@rss_cin_news:feed';
    const responseFeed = await AsyncStorage.getItem(dataFeed);
    const feed = responseFeed ? JSON.parse(responseFeed) : [];

    feed.sort((a: FeedProps, b: FeedProps) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const feedFormatted: FeedProps[] = feed.map((item: FeedProps) => {
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date());

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        urlFeed: item.urlFeed,
        category: item.category,
        image: item.image,
        date
      }
    }); 
    setFeedRssNews(feedFormatted);
    setIsLoading(false);
  };

  /**
   * Removes all news feed portals from AsyncStorage and calls loadFeedNews to refresh the state.
   *
   * @throws {Error} if unable to remove all portals from AsyncStorage
   */
  async function handleRemoveAllFeedNews() {
    try {
      const dataKey = '@rss_cin_news:feed';
      await AsyncStorage.removeItem(dataKey);
      Alert.alert('Todos os portais foram removidos');
      loadFeedNews();
    }
    catch (error) {
      console.log(error);
      Alert.alert('Não foi possível remover todos os portais');
    }
  };

  /**
   * Asynchronously restores RSS feed to local storage and sets the state of restored news.
   *
   * @return {Promise<void>} Promise that resolves when the function completes.
   */
  async function handleRestoreRssFeed(){
    const restoreFeed: FeedProps[] = rssFeeds.map((item: RssFeedProps) => {
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date());

      return {
        id: String(uuid.v4()),
        title: item.title,
        image: item.image,
        urlFeed: item.urlFeed,
        description: item.description,
        category: item.category,
        date
      }
    });
    setRestoreRssNews(restoreFeed);

    try {
      const dataKey = '@rss_cin_news:feed';
      await AsyncStorage.setItem(dataKey, JSON.stringify(restoreRssNews));
      loadFeedNews();
    }
    catch (error) {
      console.log(error);
      Alert.alert('Não foi possível restaurar as notícias');
    }
  }

  /**
   * Navigates to the 'Nova notícia' page.
   *
   * @return {void} 
   */
  function handleCreateFeedNews() {
    navigate('Nova notícia' as never);
  };

  useFocusEffect(
    useCallback(() => {
      loadFeedNews();
    }, [])
  );

  return (
    <Container>
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator
            color={useTheme().colors.primary}
            size="large"
          />
        </LoadContainer> :
  
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: 'https://github.com/Alexpraxedes.png'}}/>
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Alex Praxedes</UserName>
                </User>
              </UserInfo>
    
              <LogoutButton onPress={handleRemoveAllFeedNews}>
                <Icon name="power"/>
              </LogoutButton>
            </UserWrapper>
          </Header>

          { feedRssNews.length > 0 &&
            <>
              <LatestNewsContainer>
                <TitleLatest >Portais de notícias</TitleLatest>
                <LatestNewsCards>
                  { feedRssNews.map((item: FeedProps) => (
                    <LatestNewsCard data={item} />
                  )) }
                </LatestNewsCards>
              </LatestNewsContainer>
            </>
          }
          { feedRssNews.length === 0 &&
            <>
              <LatestNewsContainer>
                <TitleLatest>Nenhuma notícia encontrada</TitleLatest>
              </LatestNewsContainer>
              <NewsContainer
                style={{ marginTop: -80, marginBottom: -420 }}
              >
                <Button 
                    title="Restaurar RSS Feed"
                    onPress={handleRestoreRssFeed} 
                  />
              </NewsContainer>
            </>
          }

          { feedNews.length > 0 &&
            <>
              <NewsContainer>
                <Title>Nossas notícias</Title>
                <NewstList
                  data={feedNews}
                  keyExtractor={(item: { id: string; }) => item.id}
                  renderItem={
                    ( {item} : { item: DataListProps }) => <FeedNewsCard data={item} />
                  }
                />
              </NewsContainer>
            </>
          }
          { feedNews.length === 0 &&
            <>
              <NewsContainer>
                <Title>Ainda não temos notícias</Title>
              </NewsContainer>
              <NewsContainer>

                <Button 
                  title="Adicionar notícias"
                  onPress={handleCreateFeedNews} 
                />
              </NewsContainer>
            </>
          }          
        </>
      }
    </Container>
  )
}