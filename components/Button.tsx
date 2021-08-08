import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactChild | string;
  className?: string;
  variant?: 'primary' | 'secondary';
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'py-2 px-4 rounded font-bold hover:text-primary-400 animated-underline',
        'focus:outline-none focus-visible:ring ring-primary-400 ring-offset-2',
        'border border-gray-600',
        {
          'bg-dark text-white': variant === 'primary',
          'bg-white text-dark hover:bg-gray-200 hover:text-dark transition-colors':
            variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </button>
  );
}
