import { useExampleQuery } from '@/utils/query-utils';

export function QueryExample() {
  const { isFetching, isError, data } = useExampleQuery();
  return isFetching
    ? 'fetching'
    : isError
      ? 'error'
      : data?.data?.map((item) => `${item.text}\n`);
}
