import { HTMLInputTypeAttribute } from 'react';

export default function Input({
  label,
  inputType,
  error,
}: Readonly<{
  label: string;
  inputType: HTMLInputTypeAttribute;
  error: string;
}>) {
  const labelIdentifier = label
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');

  return (
    <div className='flex w-full flex-col gap-2'>
      <label htmlFor={labelIdentifier} className='text-body-sm pr-2'>
        {label} <span className='text-green-600'>*</span>
      </label>
      <input
        type={inputType || 'text'}
        name={labelIdentifier}
        id={labelIdentifier}
        autoComplete='on'
        required
        className={`${error ? 'border-red' : 'border-grey-500'} cursor-pointer rounded-lg border-2 px-6 py-3 outline-none hover:border-green-600 focus:border-green-600 active:border-green-600`}
      />
      {error && <p className='text-body-sm text-red'>{error}</p>}
    </div>
  );
}
