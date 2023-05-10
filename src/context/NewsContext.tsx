import React, { createContext, useState } from "react"; // Importing React

export interface FeedNew {
    id: string;
    title: string;
    image?: string;
    abstract: string;
    text: string;
    category: string;
    date: string;
    color: string;
}

export const NewsContext = createContext<{ selectedNews: FeedNew | null; setSelectedNews: (news: FeedNew | null) => void }>({
    selectedNews: null,
    setSelectedNews: () => {},
  });
  
  export const NewsProvider = ({ children } : any ) => {
    const [selectedNews, setSelectedNews] = useState<FeedNew | null>(null);
  
    return (
      <NewsContext.Provider value={{ selectedNews, setSelectedNews }}>
        {children}
      </NewsContext.Provider>
    );
  };
  