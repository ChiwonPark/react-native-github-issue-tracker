//Github Api의 headers.link에서 lastPage 값을 추출합니다.
export const linkParser = (linkHeader: string) => {
  //Link 단위로 split
  const chunk = linkHeader.split(',');
  //마지막 페이지를 가리키는 Link를 찾습니다.
  const lastLink = chunk.find(e => e.endsWith('rel="last"'));
  // example: <https://api.github.com/search/issues?q=is%3Aissue+state%3Aopen+&page=34&sort=created&order=desc>; rel="last"
  const lastpage = lastLink?.split('page=')[1].split('>;')[0].split('&')[0];

  return {
    lastPage: Number(lastpage),
  };
};
