export interface RssFeedProps {
    title: string;
    urlFeed: string;
    description: string;
    image: string;
    category: string;
}

export const rssFeeds = [
    {
        title: 'G1 - Todas as notícias',
        urlFeed: 'https://g1.globo.com/rss/g1/',
        description: 'Últimas notícias do Brasil e do mundo, sobre política, economia, emprego, educação, saúde, meio ambiente, tecnologia, ciência, cultura e carros.',
        image: 'https://pbs.twimg.com/media/E4psckeWUAQuYAC?format=jpg&name=large',
        category: 'world',
    },
    {   
        title: 'G1 - Brasil',
        urlFeed: 'https://g1.globo.com/rss/g1/brasil/',
        description: 'Últimas notícias do Brasil, sobre política, economia, emprego, educação, saúde, meio ambiente, tecnologia, ciência, cultura e carros.',
        image: 'https://especiais.g1.globo.com/app-g1/share-app-g1.jpg',
        category: 'world',
    },
    {
        
        title: 'G1 - Tecnologia e Games',
        urlFeed: 'https://g1.globo.com/rss/g1/tecnologia/',
        description: 'Confira notícias sobre inovações tecnológicas e internet, além de dicas sobre segurança e como usar melhor seu celular',
        image: 'https://pbs.twimg.com/media/E4ps-AUXoAYyNRF?format=jpg&name=large',
        category: 'technology',
    },
    {
        
        title: 'Jovem Nerd',
        urlFeed: 'http://jovemnerd.com.br/rss',
        description: 'Notícias sobre filmes, séries, HQs, games, animes, ciência, tecnologia e humor, porque rir não faz mal a ninguém!',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeyicBIwGj83BdD3UCqMgCJHAIwAXeYwh2RzQLaU1LCQrpfK7XK5ORodyY9d47X7sFG-A&usqp=CAU',
        category: 'entertainment',
    }
];

// https://s02.video.glbimg.com/x360/3615149.jpg