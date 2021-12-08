//Github Api의 header.link에서 lastPage값을 파싱
export const linkParser = (linkHeader: string) => {
  const chunk = linkHeader.split(',');
  const lastLink = chunk.find(e => e.endsWith('"last"'));
  const lastpage = lastLink?.split('&page=')[1].split('>;')[0];
  return {
    lastPage: Number(lastpage),
  };
};
