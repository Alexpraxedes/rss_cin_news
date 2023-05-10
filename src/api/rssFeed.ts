import axios from 'axios'; // axios is a library to make HTTP requests

export function getRssFeed(url: string) {
    return axios.create({
        baseURL: url
    });
}