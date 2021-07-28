import classNames from 'classnames';
import { forwardRef } from 'react';

type Props = JSX.IntrinsicElements['textarea'] & {
  size?: 'xs' | 'base' | 'lg';
  name: string;
  isError?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { size = 'base', name, isError = false, resize = 'vertical', ...props },
    ref
  ) => {
    const baseStyle = 'leading-relaxed rounded focus:outline-none focus:ring-1';
    const borderStyle = isError
      ? 'border-2 border-red-600 focus:ring-red-400'
      : 'border border-gray-400 focus:ring-green-400';
    const styles = classNames(baseStyle, borderStyle, {
      'text-xs py-1 px-1': size === 'xs',
      'text-base py-2 px-2': size === 'base',
      'text-xl py-3 px-3': size === 'lg',
      'resize-none': resize === 'both',
      'resize-y': resize === 'vertical',
      'resize-x': resize === 'horizontal',
      resize: resize === 'both',
    });

    return <textarea className={styles} ref={ref} name={name} {...props} />;
  }
);

export default TextArea;
