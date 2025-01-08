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
  return 'no implemento'
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
