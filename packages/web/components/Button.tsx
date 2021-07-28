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
  `bg-${color}-500 text-blue-50 hover:bg-${color}-600 focus:ring-${color}-300 active:bg-${color}-700`;
const outlinedColorScheme = (color: string) =>
  `bg-transparent text-${color}-500 border border-${color}-500 hover:text-blue-50 hover:bg-${color}-500 focus:ring-${color}-300 active:bg-${color}-600`;

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
