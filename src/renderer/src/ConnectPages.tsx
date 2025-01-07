import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot
} from '@renderer/chakra-components/ui/steps'
import { Group } from '@chakra-ui/react'
import { Button } from '@renderer/components/ui/button'
import * as Card from '@renderer/components/ui/card'
import { Loader2 } from 'lucide-react'
import { api } from './WithProviders'

export function ConnectHandshakePage(): JSX.Element {
  const open = api.providers.handshake.openLogin.useMutation()
  const test = api.providers.handshake.test.useMutation()

  return (
    <div className="p-4">
      <Card.Card className="mx-auto max-w-2xl">
        <Card.CardHeader>
          <Card.CardTitle>
            <div className="text-xl text-center">Connect Provider</div>
          </Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent>
          <StepsRoot colorPalette={'green'} defaultValue={1} count={3}>
            <StepsList>
              <StepsItem index={0} title="Step 1" description="Login" />
              <StepsItem index={1} title="Step 2" description="Test Connection" />
              <StepsItem index={2} title="Step 3" description="Results" />
            </StepsList>
            <StepsContent index={0}>
              <div className="flex justify-center">
                <StepsNextTrigger asChild>
                  <Button onClick={() => open.mutate()}>Login</Button>
                </StepsNextTrigger>
              </div>
            </StepsContent>
            <StepsContent index={1}>
              <div className="flex justify-center">
                <StepsNextTrigger asChild>
                  <Button onClick={() => test.mutate()}>Test Connection</Button>
                </StepsNextTrigger>
              </div>
            </StepsContent>
            <StepsContent index={2}>
              <div className="flex justify-center">
                <TestResults />
              </div>
            </StepsContent>
            <StepsCompletedContent>
              <div className="flex justify-center">You are now connected</div>
            </StepsCompletedContent>
            <Card.CardFooter className="flex justify-center">
              <Group>
                <StepsPrevTrigger asChild>
                  <Button size="sm">Prev</Button>
                </StepsPrevTrigger>
                <StepsNextTrigger asChild>
                  <Button size="sm">Next</Button>
                </StepsNextTrigger>
              </Group>
            </Card.CardFooter>
          </StepsRoot>
        </Card.CardContent>
      </Card.Card>
    </div>
  )
  function TestResults() {
    if (test.isLoading)
      return (
        <Button disabled>
          <Loader2 className={'animate-spin'} />
          Testing Connection
        </Button>
      )
    if (test.isSuccess)
      return (
        <StepsNextTrigger>
          <Button>Passed Continue?</Button>
        </StepsNextTrigger>
      )
    return (
      <StepsPrevTrigger>
        <StepsPrevTrigger>
          <Button variant={'destructive'}>Failed Retry?</Button>
        </StepsPrevTrigger>
      </StepsPrevTrigger>
    )
  }
}
