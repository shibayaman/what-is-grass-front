import classNames from 'classnames';
import { FC } from 'react';

type ButtonColorSchemeOptions =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'primary-outline'
  | 'secondary-outline'
  | 'accent-outline';

type Props = JSX.IntrinsicElements['button'] & {
  variant: ButtonColorSchemeOptions;
  size?: 'xs' | 'base' | 'lg';
  shadow?: boolean;
};

const filledColorScheme = (color: string) =>
  classNames(
    {
      'bg-green-500 hover:bg-green-600 focus:ring-green-300 active:bg-green-700':
        color === 'green',
      'bg-gray-500 hover:bg-gray-600 focus:ring-gray-300 active:bg-gray-700':
        color === 'gray',
      'bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 active:bg-orange-700':
        color === 'orange',
    },
    'text-blue-50'
  );
const outlinedColorScheme = (color: string) =>
  classNames(
    {
      'text-green-500 border-green-500 hover:bg-green-500 focus:ring-green-300 active:bg-green-600':
        color === 'green',
      'text-gray-500 border-gray-500 hover:bg-gray-500 focus:ring-gray-300 active:bg-gray-600':
        color === 'gray',
      'text-orange-500 border-orange-500 hover:bg-orange-500 focus:ring-orange-300 active:bg-orange-600':
        color === 'orange',
    },
    'bg-transparent border hover:text-blue-50'
  );

const colorSchemes: Record<ButtonColorSchemeOptions, string> = {
  primary: filledColorScheme('green'),
  'primary-outline': outlinedColorScheme('green'),
  secondary: filledColorScheme('gray'),
  'secondary-outline': outlinedColorScheme('gray'),
  accent: filledColorScheme('orange'),
  'accent-outline': outlinedColorScheme('orange'),
};

const Button: FC<Props> = ({
  size = 'base',
  variant,
  shadow,
  children,
  ...props
}) => {
  const colorScheme = colorSchemes[variant];
  const baseStyle =
    'whitespace-nowrap rounded focus:outline-none focus:ring disabled:opacity-50 disabled:cursor-not-allowed';
  const styles = classNames(baseStyle, colorScheme, {
    'shadow-md': shadow,
    'text-xs py-1 px-4': size === 'xs',
    'text-base py-2 px-4': size === 'base',
    'text-xl py-3 px-4': size === 'lg',
  });

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
