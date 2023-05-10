import React, { createContext, useState } from "react"; // Importing React
import { FeedProps } from "../screens/Feed"; // Importing the FeedProps interface
import * as rssParser from 'react-native-rss-parser'; // Importing the rssParser from react-native-rss-parser
 

export const FeedContext = createContext<{ 
  selectedFeed: FeedProps | null; setSelectedFeed: (feed: FeedProps | null) => void 
}>({
  selectedFeed: null, setSelectedFeed: () => {},
});
  
export const FeedProvider = ({ children } : any ) => {
  const [selectedFeed, setSelectedFeed] = useState<FeedProps | null>(null);

  return (
    <FeedContext.Provider value={{ selectedFeed, setSelectedFeed }}>
      {children}
    </FeedContext.Provider>
  );
};

export function getRssFeed(url: string){
  const item =  fetch(url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData));
  return item;
}