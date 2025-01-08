import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@renderer/components/ui/alert-dialog'
import { api } from './WithProviders'
import * as card from './components/ui/card'

export function SearchJobs() {
  const list = api.connect.getList.useQuery()
  if (!list.data?.length) return <NoConnect />
  return (
    <div className="flex justify-center items-center py-2">
      <SearchMenu />
    </div>
  )
}

function SearchMenu() {
  return (
    <Tabs defaultValue="Search" className="w-full max-w-2xl">
      <TabsList className="grid grid-cols-2 w-full rounded">
        <TabsTrigger className="rounded" value="Search">
          New Search
        </TabsTrigger>
        <TabsTrigger className="rounded" value="Results">
          Search Results
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Search">
        <NewSearch />
      </TabsContent>
      <TabsContent value="Results">
        <SearchResults />
      </TabsContent>
    </Tabs>
  )

  function SearchResults() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2"></CardContent>
      </Card>
    )
  }

  function NewSearch() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Enter your search parameters below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Keywords />
          <Location />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Search</Button>
        </CardFooter>
      </Card>
    )

    function Location() {
      return (
        <Tabs defaultValue="onsite">
          <TabsList className="grid grid-cols-2 mb-2 w-full rounded">
            <TabsTrigger className="rounded" value="onsite">
              On-Site
            </TabsTrigger>
            <TabsTrigger className="rounded" value="remote">
              Remote
            </TabsTrigger>
          </TabsList>
          <TabsContent value="onsite">
            <div className="space-y-1">
              <Label htmlFor="location">Location</Label>
              <Input id="location" />
            </div>
          </TabsContent>
          <TabsContent value="remote"></TabsContent>
        </Tabs>
      )
    }

    function Keywords() {
      return (
        <Tabs defaultValue="keywords">
          <TabsList className="grid grid-cols-2 mb-2 w-full rounded">
            <TabsTrigger className="rounded" value="keywords">
              Use Keywords
            </TabsTrigger>
            <TabsTrigger className="rounded" value="resume">
              Use Resume
            </TabsTrigger>
          </TabsList>
          <TabsContent value="keywords">
            <div className="space-y-1">
              <Label htmlFor="keywords">Keywords</Label>
              <Input id="keywords" />
            </div>
          </TabsContent>
          <TabsContent value="resume"></TabsContent>
        </Tabs>
      )
    }
  }
}

function NoConnect() {
  return (
    <div className="flex justify-center items-center py-2">
      <AlertNoConnect />
      <card.Card className="w-full max-w-2xl">
        <card.CardTitle>
          <card.CardHeader>
            <card.CardTitle className="flex gap-2 justify-center items-center text-xl">
              No Providers Connected
            </card.CardTitle>
          </card.CardHeader>
        </card.CardTitle>
      </card.Card>
    </div>
  )
}

function AlertNoConnect() {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="sm:rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>No Providers Connected</AlertDialogTitle>
          <AlertDialogDescription>
            You are not connected to any search providers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="rounded">Dismiss</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
