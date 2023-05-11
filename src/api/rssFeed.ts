import axios from 'axios'; // axios is a library to make HTTP requests

/**
 * Creates an axios instance with the given URL as the baseURL.
 *
 * @param {string} url - The URL to use as the baseURL.
 * @return {AxiosInstance} The axios instance with the baseURL set to the given URL.
 */
export function getRssFeed(url: string) {
    return axios.create({
        baseURL: url
    });
}