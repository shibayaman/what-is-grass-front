import { FC } from 'react';

type Props = {
  label: string;
  size?: 'xs' | 'base' | 'lg';
  error?: string;
  positionErrorMessageAbsolute?: boolean;
};

const LabeledFormElement: FC<Props> = ({
  size = 'base',
  label,
  error,
  children,
  positionErrorMessageAbsolute = true,
}) => {
  return (
    <div>
      <label className={`text-${size} ${error && 'text-red-600'}`}>
        <span className="block mb-1.5">{label}</span>
        {children}
      </label>
      {error && (
        <span
          className={`text-${size} text-red-600 block ${
            positionErrorMessageAbsolute && 'absolute'
          }`}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default LabeledFormElement;
