import { api } from './main'
import { useEffect, useState } from "react"
import { database } from "./db"
import { posts } from "../../db/schema"

function App(): JSX.Element {
  const get = api.getPosts.useQuery()
  const set = api.setPosts.useMutation()
  if (get.isError) return <div>{get.error.message}</div>
  if (get.isLoading) return <div>{'loading'}</div>
  return (
    <div>
      <div>
        <form onSubmit={e => {
          e.preventDefault()

          const formData = new FormData(e.target as HTMLFormElement)
          const title = formData.get('title') as string
          if (title) {
            set.mutate(title)
            get.refetch()
          }
        }}>
          <input name="title" type="text" placeholder="title" />
          <button>add</button>
        </form>
      </div>
      {get.data.map(post => {
        return (
          <div key={post.id}>
            {post.title}
          </div>
        )
      })}
    </div>
  )
}

export default App
