import { MouseEvent, ReactElement, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FileWithPath, useDropzone } from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import clsx from 'clsx';

import {
  HiOutlineExternalLink,
  HiOutlineEye,
  HiOutlinePaperClip,
  HiOutlinePhotograph,
  HiX,
} from 'react-icons/hi';

import UnstyledLink from '@/components/UnstyledLink';

type DropzoneInputProps = {
  accept?: string;
  helperText?: string;
  id: string;
  label: string;
  maxFiles?: number;
  readOnly?: boolean;
  validation?: object;
};

type FilePreviewProps = {
  deleteFile: (e: MouseEvent, file: FileWithPath) => void;
  file: FileWithPath;
};

const FilePreview = ({ deleteFile, file }: FilePreviewProps): ReactElement => {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = [URL.createObjectURL(file)];

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteFile(e, file);
  };

  const imagesType = ['image/png', 'image/jpg', 'image/jpeg'];

  return imagesType.includes(file.type) ? (
    <>
      <li
        className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'
        key={file.name}
      >
        <div className='flex items-center flex-1 w-0'>
          <HiOutlinePhotograph
            className='flex-shrink-0 w-5 h-5 text-gray-400'
            aria-hidden='true'
          />
          <span className='flex-1 w-0 ml-2 truncate'>{file.name}</span>
        </div>
        <div className='flex-shrink-0 ml-4'>
          <button
            type='button'
            onClick={() => setIsOpen(true)}
            className='inline-block mr-2 text-xl font-medium text-gray-500 focus:outline-none hover:text-gray-700'
          >
            <HiOutlineEye />
          </button>
          <button
            type='button'
            onClick={handleDelete}
            className='text-xl font-medium text-red-500 focus:outline-none hover:text-red-700'
          >
            <HiX />
          </button>
        </div>
      </li>
      {isOpen && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          prevSrc={images[(index + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setIndex(
              (prevIndex) => (prevIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setIndex((prevIndex) => (index + 1) % images.length)
          }
        />
      )}
    </>
  ) : (
    <li
      key={file.name}
      className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'
    >
      <div className='flex items-center flex-1 w-0'>
        <HiOutlinePaperClip
          className='flex-shrink-0 w-5 h-5 text-gray-400'
          aria-hidden='true'
        />
        <span className='flex-1 w-0 ml-2 truncate'>{file.name}</span>
      </div>
      <div className='flex space-x-2'>
        <UnstyledLink href={URL.createObjectURL(file)}>
          <HiOutlineExternalLink
            size={24}
            className='text-gray-500 cursor-pointer hover:text-gray-700'
          />
        </UnstyledLink>
        <button type='button' onClick={(e) => deleteFile(e, file)}>
          <HiX
            size={24}
            className='text-red-500 cursor-pointer hover:text-red-700'
          />
        </button>
      </div>
    </li>
  );
};

export default function DropzoneInput({
  accept,
  helperText = '',
  id,
  label,
  maxFiles = 1,
  validation,
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
        setValue(id, []);
        setError(id, {
          type: 'manual',
          message: rejectedFiles && rejectedFiles[0].errors[0].message,
        });
      } else {
        setValue(id, acceptedFiles, { shouldValidate: true });
        clearErrors(id);
      }
    },
    [id, setValue, setError, clearErrors]
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

      {files?.length >= maxFiles ? (
        <ul className='border border-gray-200 divide-y divide-gray-200 rounded-md'>
          {files.map((file, index) => (
            <FilePreview key={index} file={file} deleteFile={deleteFile} />
          ))}
        </ul>
      ) : (
        <>
          <div className='mt-1' {...getRootProps()}>
            <input {...register(id, validation)} id={id} {...getInputProps()} />
            <div
              className={clsx(
                'w-full p-2 bg-gray-100 border border-gray-300 border-dashed rounded cursor-pointer',
                errors[id]
                  ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
                  : 'focus:ring-dark-400 focus:border-dark-400'
              )}
            >
              <p className='my-20 text-center text-gray-500'>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
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
          {!!files?.length && (
            <ul className='border border-gray-200 divide-y divide-gray-200 rounded-md'>
              {files.map((file, index) => (
                <FilePreview key={index} file={file} deleteFile={deleteFile} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
