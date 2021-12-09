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
  //for SearchScreen
  getRepositoriesByName: (repoName: string) =>
    apiClient
      .get('/search/repositories', {
        params: {
          q: repoName,
        },
      })
      .then(response => response.data),

  //for RepositoriesScreen
  getRepositoryById: (repoId: number) =>
    apiClient
      .get<Repository>(`/repositories/${repoId}`)
      .then(response => response.data),

  //for IssuesScreen
  getIssues: ({
    issueState,
    repos,
    sort,
    order,
    page,
  }: {
    repos: string[];
    issueState: 'all' | 'open' | 'closed';
    sort: 'created' | 'updated';
    order: 'asc' | 'desc';
    page: number;
  }) =>
    apiClient
      .get<PaginationResponse<Issue>>('/search/issues', {
        params: {
          q: `
          is:issue 
          ${issueState !== 'all' ? `state:${issueState}` : ''} 
          ${repos.map(e => 'repo:' + e).join(' ')}`,
          sort: sort,
          order: order,
          page: page,
        },
      })
      .then(response => {
        const {lastPage} = linkParser(response.headers.link || '');
        return {
          ...response.data,
          isLastPage: !lastPage,
        };
      }),
};
