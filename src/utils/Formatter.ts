export default {
  /**
   * 두 Date의 시간 차이를 매우 짧은 문자열로 반환합니다.
   * 양수를 얻으려면 date1이 date2보다 최근시간이어야 합니다.
   */
  getDiffShorten: (date1: Date, date2: Date) => {
    const diffSeconds = (date1.getTime() - date2.getTime()) / 1000;

    //1분 미만
    if (diffSeconds < 60) {
      return 'now';
    }
    // 1시간 미만 => 분 단위 표시
    else if (diffSeconds < 60 * 60) {
      return `${Math.floor(diffSeconds / 60)}m`;
    }
    // 1일 미만 => 시간 단위 표시
    else if (diffSeconds < 60 * 60 * 24) {
      return `${Math.floor(diffSeconds / (60 * 60))}h`;
    }
    // 1년 미만 => 일 단위 표시
    else if (diffSeconds < 60 * 60 * 24 * 365) {
      return `${Math.floor(diffSeconds / (60 * 60 * 24))}d`;
    }
    // 1년 이상 => 연 단위 표시
    else {
      return `${Math.floor(diffSeconds / (60 * 60 * 24 * 365))}y`;
    }
  },
};
