import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';

import { classNames } from '@/lib/helper';

type DatePickerProps = {
  validation?: RegisterOptions;
  label: string;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  helperText?: string;
  readOnly?: boolean;
} & Omit<ReactDatePickerProps, 'onChange'>;

export default function DatePicker({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  ...rest
}: DatePickerProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  return (
    <div className='relative'>
      <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
        {label}
      </label>

      <Controller
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className='relative mt-1'>
              <ReactDatePicker
                name={id}
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                className={classNames(
                  readOnly
                    ? 'bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300'
                    : errors[id]
                    ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
                    : 'focus:ring-primary-500 border-gray-300 focus:border-primary-500',
                  'block w-full rounded-md shadow-sm'
                )}
                placeholderText={placeholder}
                aria-describedby={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                openToDate={value ?? defaultDate}
                dateFormat='dd/MM/yyyy'
                readOnly={readOnly}
                {...rest}
              />
              <HiOutlineCalendar className='absolute text-lg text-gray-500 transform -translate-y-1/2 pointer-events-none right-4 top-1/2' />
            </div>
            <div className='mt-1'>
              {helperText !== '' && (
                <p className='text-xs text-gray-500'>{helperText}</p>
              )}
              {errors[id] && (
                <span className='text-sm text-red-500'>
                  {errors[id].message}
                </span>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
