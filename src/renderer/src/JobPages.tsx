import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@renderer/components/ui/alert-dialog'
import { Button } from '@renderer/components/ui/button'

import { api } from './WithProviders'
import * as icons from 'lucide-react'
import * as card from './components/ui/card'

export function SearchJobs() {
  const list = api.connect.getList.useQuery()
  if (list.data?.length) {
    return (
      <>
        <Alert />
        <div className="flex justify-center items-center py-2">
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
      </>
    )
  }
}

export function Alert() {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="">
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
