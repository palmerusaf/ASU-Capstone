import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot
} from '@renderer/chakra-components/ui/steps'
import { Button } from '@renderer/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@renderer/components/ui/card'
import { Loader2 } from 'lucide-react'
import { api } from './WithProviders'
import { useState } from 'react'

export function ConnectHandshakePage(): JSX.Element {
  const open = api.connect.handshake.openLogin.useMutation()
  const test = api.connect.handshake.test.useMutation()
  const [step, setStep] = useState(0)
  const nextStep = () => setStep((prev) => prev + 1)
  const firstStep = () => setStep(0)
  const lastStep = () => setStep(3)

  return (
    <div className="p-4">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>
            <div className="text-xl text-center">Connect Provider</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StepsRoot step={step} colorPalette={'green'} defaultValue={1} count={3}>
            <StepsList>
              <StepsItem index={0} title="Step 1" description="Login" />
              <StepsItem index={1} title="Step 2" description="Test Connection" />
              <StepsItem index={2} title="Step 3" description="Results" />
            </StepsList>
            <StepsContent index={0}>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    open.mutate()
                    nextStep()
                  }}
                >
                  Login
                </Button>
              </div>
            </StepsContent>
            <StepsContent index={1}>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    test.mutate()
                    nextStep()
                  }}
                >
                  Test Connection
                </Button>
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
          </StepsRoot>
        </CardContent>
      </Card>
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
    if (test.data !== undefined && test.data)
      return <Button onClick={lastStep}>Passed Continue?</Button>
    return (
      <Button onClick={firstStep} variant={'destructive'}>
        Failed Retry?
      </Button>
    )
  }
}
