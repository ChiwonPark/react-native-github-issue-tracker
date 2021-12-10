import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import api from '../api';
import {Issue} from '../api/types';
import {RootState} from '../store';

export default function useFetchIssues() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Issue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  //필터
  const {filter} = useSelector((state: RootState) => state);
  const filterParams = useMemo(() => {
    const {issueState, repos} = filter;
    const type = 'is:issue';
    const state = issueState !== 'all' ? `state:${issueState}` : '';
    const repo = repos.map(e => 'repo:' + e).join(' ');

    return {
      q: `${type} ${state} ${repo}`,
      sort: filter.sort === 'updated' ? 'updated' : 'created',
      order: filter.sort === 'oldest' ? 'asc' : 'desc',
    };
  }, [filter]);

  const fetchIssues = async (isRefresh?: boolean) => {
    isRefresh ? setIsRefreshing(true) : setIsLoading(true);
    try {
      const data = await api.getIssues({page: 1, ...filterParams});
      setData(data.items);
      setError(null);
      setIsError(false);
      setCurrentPage(1);
      setIsLastPage(data.isLastPage);
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setError(error);
    } finally {
      isRefresh ? setIsRefreshing(false) : setIsLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (isLastPage || isLoading || isRefreshing || isMoreLoading) {
      return;
    }

    setIsMoreLoading(true);
    try {
      const data = await api.getIssues({
        page: currentPage + 1,
        ...filterParams,
      });
      setData(prev => [...prev, ...data.items]);
      setError(null);
      setIsError(false);
      setCurrentPage(prev => prev + 1);
      setIsLastPage(data.isLastPage);
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setError(error);
    } finally {
      setIsMoreLoading(false);
    }
  };

  //필터가 변경될 때마다 이슈를 다시 가져옴
  useEffect(() => {
    //아직 저장소를 등록안했을 때
    if (filter.repos.length === 0) {
      return;
    }

    fetchIssues();
  }, [filter]);

  return {
    //states
    isLoading,
    isRefreshing,
    isMoreLoading,
    isError,
    data,
    error,
    currentPage,
    isLastPage,

    //functions
    fetchIssues,
    refresh: () => fetchIssues(true),
    fetchNextPage,
  };
}
