import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();
export default function ReactQuery({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>ReactQuery</div>;
}
