import axios from 'axios';
import {linkParser} from '../utils';
import {Issue, PaginationResponse, Repository} from './types';

const apiClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: 'token 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',
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
  }) =>
    apiClient
      .get<PaginationResponse<Issue>>('/search/issues', {
        params: {
          q: `is:issue ${
            query.issueState !== 'all' ? `state:${query.issueState}` : ''
          } ${query.repos.map(e => 'repo:' + e).join(' ')}`,
          page: query.page,
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
