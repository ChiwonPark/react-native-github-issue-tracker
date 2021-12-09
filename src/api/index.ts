import axios from 'axios';
import {linkParser} from '../utils';
import {Issue, PaginationResponse, Repository} from './types';
import Config from 'react-native-config';

const apiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Authorization: Config.TOKEN ? `token ${Config.TOKEN}` : '',
  },
});

export default {
  getRepositoriesByName: (repoName: string) =>
    apiClient
      .get('/search/repositories', {
        params: {
          q: repoName,
        },
      })
      .then(response => response.data),
  getRepositoryById: (repoId: number) =>
    apiClient
      .get<Repository>(`/repositories/${repoId}`)
      .then(response => response.data),
  getIssues: (query: {
    type?: 'issue';
    repos: string[];
    page: number;
    issueState: 'all' | 'open' | 'closed';
    sort: 'created' | 'updated';
    order: 'asc' | 'desc';
  }) =>
    apiClient
      .get<PaginationResponse<Issue>>('/search/issues', {
        params: {
          q: `is:issue ${
            query.issueState !== 'all' ? `state:${query.issueState}` : ''
          } ${query.repos.map(e => 'repo:' + e).join(' ')}`,
          page: query.page,
          sort: query.sort,
          order: query.order,
        },
      })
      .then(response => {
        const {lastPage} = linkParser(response.headers.link || '');
        console.log(`${query.page} to ${lastPage}`);
        return {
          ...response.data,
          isLastPage: !lastPage,
        };
      }),
};
