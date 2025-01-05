import { api } from './main'

function App(): JSX.Element {
  const get = api.posts.get.useQuery()
  const set = api.posts.set.useMutation()
  if (get.isError) return <div>{get.error.message}</div>
  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            const formData = new FormData(e.target as HTMLFormElement)
            const title = formData.get('title') as string
            if (title) {
              set.mutate(title)
              get.refetch()
            }
          }}
        >
          <input name="title" type="text" placeholder="title" />
          <button>add</button>
        </form>
      </div>
      {get.isLoading
        ? 'Loading'
        : get.data.map((post) => {
          return <div key={post.id}>{post.title}</div>
        })}
    </div>
  )
}

export default App
