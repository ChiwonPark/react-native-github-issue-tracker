import axios from 'axios';
import Config from 'react-native-config';
import {linkParser} from '../utils';
import {Issue, PaginationResponse, Repository} from './types';

const apiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Authorization: Config.TOKEN ? `token ${Config.TOKEN}` : '',
  },
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    //https://docs.github.com/en/rest/overview/resources-in-the-rest-api#failed-login-limit
    if (error.response.status === 401) {
      error.message = '인증이 유효하지 않습니다.';
    }

    if (error.response.status === 403) {
      error.message =
        '요청 횟수가 초과되었습니다.\n최대 1시간 이후 다시 시도하세요.';
    }

    return Promise.reject(error);
  },
);

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
  getIssues: (params: {
    q: string;
    sort?: string;
    order?: string;
    page: number;
  }) =>
    apiClient
      .get<PaginationResponse<Issue>>('/search/issues', {params})
      .then(response => {
        const {lastPage} = linkParser(response.headers.link || '');
        return {
          ...response.data,
          isLastPage: !lastPage,
        };
      }),
};
