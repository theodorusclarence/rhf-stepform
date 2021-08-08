import clsx from 'clsx';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type SelectProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<'select'>;

export default function Select({
  label,
  helperText,
  id,
  placeholder,
  readOnly = false,
  children,
  validation,
  ...rest
}: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = Children.map<ReactNode, ReactNode>(
    children,
    (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          disabled: child.props.value !== rest?.defaultValue,
          // selected: child.props.value === rest?.defaultValue,
        });
      }
    }
  );

  return (
    <div>
      <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
        {label}
      </label>
      <div className='relative mt-1'>
        <select
          {...register(id, validation)}
          // defaultValue to value blank, will get overriden by ...rest if needed
          defaultValue=''
          {...rest}
          name={id}
          id={id}
          className={clsx(
            readOnly
              ? 'bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300'
              : errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-primary-500 border-gray-300 focus:border-primary-500',
            'block w-full rounded-md shadow-sm'
          )}
          aria-describedby={id}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}
          {readOnly ? readOnlyChildren : children}
        </select>

        {errors[id] && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
        {errors[id] && (
          <span className='text-sm text-red-500'>{errors[id].message}</span>
        )}
      </div>
    </div>
  );
}
