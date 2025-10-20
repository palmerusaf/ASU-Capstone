import * as React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AsyncButtonProps extends ButtonProps {
  loadingText?: string; // optional custom message
  onClickAsync?: () => Promise<void>; // optional async handler
}

export const AsyncButton = React.forwardRef<
  HTMLButtonElement,
  AsyncButtonProps
>(({ children, loadingText = 'Loading...', onClickAsync, ...props }, ref) => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e);

    if (onClickAsync) {
      try {
        setLoading(true);
        await onClickAsync();
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button
      {...props}
      ref={ref}
      onClick={handleClick}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
});

AsyncButton.displayName = 'AsyncButton';
