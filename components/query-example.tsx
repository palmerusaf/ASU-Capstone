import { useExampleQuery } from '@/utils/query-utils';

export function QueryExample() {
  const { isPending, isError, data } = useExampleQuery();
  return isPending
    ? 'loading'
    : isError
      ? 'error'
      : data?.data?.map((item) => `${item.text}\n`);
}
