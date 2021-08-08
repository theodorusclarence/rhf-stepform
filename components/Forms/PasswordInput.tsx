import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import { classNames } from '@/lib/helper';
import clsx from 'clsx';
import { InputProps } from './Input';

export default function PasswordInput({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  readOnly = false,
  validation,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div>
      <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
        {label}
      </label>
      <div className='relative mt-1'>
        <input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? 'bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300'
              : errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-primary-500 border-gray-300 focus:border-primary-500',
            'block w-full rounded-md shadow-sm'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            togglePassword();
          }}
          type='button'
          className='absolute inset-y-0 right-0 flex items-center p-1 mr-3 rounded-lg focus:outline-none focus:ring focus:ring-primary-500'
        >
          {showPassword ? (
            <HiEyeOff className='text-xl text-gray-500 cursor-pointer hover:text-gray-600' />
          ) : (
            <HiEye className='text-xl text-gray-500 cursor-pointer hover:text-gray-600' />
          )}
        </button>
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
