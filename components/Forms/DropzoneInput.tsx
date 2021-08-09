import clsx from 'clsx';
import { MouseEvent, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { FileWithPath, useDropzone } from 'react-dropzone';

import { FilePreview } from './FilePreview';

type DropzoneInputProps = {
  accept?: string;
  helperText?: string;
  id: string;
  label: string;
  maxFiles?: number;
  readOnly?: boolean;
  validation?: object;
};

export default function DropzoneInput({
  accept,
  helperText = '',
  id,
  label,
  maxFiles = 1,
  validation,
  readOnly,
}: DropzoneInputProps) {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const files: FileWithPath[] = watch(id);
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null);
        setError(id, {
          type: 'manual',
          message: rejectedFiles && rejectedFiles[0].errors[0].message,
        });
      } else {
        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          {
            shouldValidate: true,
          }
        );
        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  );

  const deleteFile = (e: MouseEvent, file: FileWithPath) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setValue(id, newFiles);
    } else {
      setValue(id, []);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 2000000,
  });

  return (
    <>
      <label className='block text-sm font-normal text-gray-700' htmlFor={id}>
        {label}
      </label>

      {readOnly && !(files?.length > 0) ? (
        <div className='py-3 pl-3 pr-4 text-sm border border-gray-300 divide-y divide-gray-300 rounded-md'>
          No file uploaded
        </div>
      ) : files?.length >= maxFiles ? (
        <ul className='border border-gray-300 divide-y divide-gray-300 rounded-md'>
          {files.map((file, index) => (
            <FilePreview
              key={index}
              readOnly={readOnly}
              file={file}
              deleteFile={deleteFile}
            />
          ))}
        </ul>
      ) : (
        <>
          <div
            className='mt-1 focus:outline-none focus:ring-dark-400 group'
            {...getRootProps()}
          >
            <input {...register(id, validation)} id={id} {...getInputProps()} />
            <div
              className={clsx(
                'w-full p-2 bg-gray-100 border border-gray-300 border-dashed rounded cursor-pointer',
                errors[id]
                  ? 'border-red-500 group-focus:border-red-500'
                  : 'group-focus:border-primary-500'
              )}
            >
              <div className='my-20 space-y-2 text-center'>
                <p className='text-gray-500'>
                  Drag &apos;n&apos; drop some files here, or click to select
                  files
                </p>
                <p className='text-xs text-gray-500'>{`${
                  maxFiles - (files?.length || 0)
                } file(s) remaining`}</p>
              </div>
            </div>
          </div>

          <div className='mt-1'>
            {helperText !== '' && (
              <p className='text-xs text-gray-500'>{helperText}</p>
            )}
            {errors[id] && (
              <p className='text-sm text-red-500'>{errors[id].message}</p>
            )}
          </div>
          {!readOnly && !!files?.length && (
            <ul className='border border-gray-300 divide-y divide-gray-300 rounded-md'>
              {files.map((file, index) => (
                <FilePreview
                  key={index}
                  readOnly={readOnly}
                  file={file}
                  deleteFile={deleteFile}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
