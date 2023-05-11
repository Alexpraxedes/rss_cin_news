import React, { createContext, useState } from "react"; // Importing React
import { FeedProps } from "../screens/Feed"; // Importing the FeedProps interface
import * as rssParser from 'react-native-rss-parser'; // Importing the rssParser from react-native-rss-parser
 
  /**
   * A function that sets the selected feed.
   *
   * @param {any} selectedFeed - The selected feed to set.
   * @param {Function} setSelectedFeed - The function to set the selected feed.
   */
export const FeedContext = createContext<{ 
  selectedFeed: FeedProps | null; setSelectedFeed: (feed: FeedProps | null) => void 
}>({
  selectedFeed: null, setSelectedFeed: () => {},
});
  
/**
 * Creates a FeedProvider component that wraps children components, and provides a context for
 * managing the selected feed.
 *
 * @param {Object} props - The props object containing a children property
 * @return {JSX.Element} A JSX element representing the FeedContext.Provider component
 */
export const FeedProvider = ({ children } : any ) => {
  const [selectedFeed, setSelectedFeed] = useState<FeedProps | null>(null);

  return (
    <FeedContext.Provider value={{ selectedFeed, setSelectedFeed }}>
      {children}
    </FeedContext.Provider>
  );
};

/**
 * Retrieves an RSS feed from the given url and parses the response into an item.
 *
 * @param {string} url - The url of the RSS feed to retrieve.
 * @return {Promise<any>} A Promise that resolves to the parsed item from the RSS feed.
 */
export function getRssFeed(url: string){
  const item =  fetch(url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData));
  return item;
}