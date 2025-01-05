import { api } from './main'

function App(): JSX.Element {
  const q = api.greeting.useQuery({ name: 'World' })
  if (q.isError) return <div>{q.error.message}</div>
  if (q.isLoading) return <div>{'loading'}</div>
  return <div>{q.data.text}</div>
}

export default App
