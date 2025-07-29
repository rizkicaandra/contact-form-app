'use client';
import Input from '@/components/Input';
import MessageSuccess from '@/components/MessageSuccess';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const radioValue = [
    {
      label: 'General Enquiry',
      value: 'general',
    },
    {
      label: 'Product Inquiry',
      value: 'product',
    },
  ];

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value);
  };

  useEffect(() => {
    if (!success) return;

    // Clear message after 3 seconds
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 2000);

    // Clean up the timer if the component re-renders
    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newErros: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.firstName) newErros.firstName = 'This field is required.';
    if (!data.lastName) newErros.lastName = 'This field is required.';
    if (!data.email) newErros.email = 'This field is required.';
    if (typeof data.email === 'string' && !emailRegex.test(data.email))
      newErros.email = 'Please enter a valid email address.';
    if (!data.queryType) newErros.queryType = 'Please select a query type.';
    if (!data.message) newErros.message = 'This field is required.';
    if (!data.terms)
      newErros.terms =
        'To submit this form, please consent to being contacted.';

    if (Object.keys(newErros).length > 0) {
      setErrors(newErros);
      return;
    }

    setErrors({});
    setSelectedRadio(null);
    setSuccess(true);

    formRef.current?.reset();
  };

  return (
    <main className='relative mx-4 my-8 flex items-center justify-center md:my-32'>
      {success && <MessageSuccess />}

      <form
        id='contact-form'
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className='min-w-form-mobile md:min-w-form-tablet lg:min-w-form-desktop rounded-2xl bg-white p-6 md:p-10'
      >
        <h1 className='text-heading md:text-heading mb-8'>Contact Us</h1>

        {/* Full Name */}
        <div className='mb-6 flex flex-col gap-6 md:flex-row'>
          <Input label='First Name' inputType='text' error={errors.firstName} />
          <Input label='Last Name' inputType='text' error={errors.lastName} />
        </div>

        {/* Email */}
        <div className='mb-6'>
          <Input label='Email' inputType='email' error={errors.email} />
        </div>

        {/* Query Type */}
        <div className='mb-6'>
          <fieldset className='flex flex-col gap-4 md:flex-row'>
            <legend className='text-body-sm mb-4'>
              Query Type <span className='text-green-600'>*</span>
            </legend>

            {radioValue.map(({ label, value }) => (
              <label
                key={value}
                htmlFor={value}
                className={`${selectedRadio === value ? 'border-green-900 bg-green-200' : 'border-grey-500 bg-white'} flex w-full cursor-pointer items-center gap-3 rounded-lg border-2 px-6 py-3 hover:border-green-600`}
              >
                <input
                  type='radio'
                  name='queryType'
                  id={value}
                  value={value}
                  onChange={handleRadioChange}
                  className={
                    'border-grey-500 h-6 w-6 rounded-full border-2 accent-green-600 checked:border-green-600 active:border-green-600 active:accent-green-600'
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          {errors.queryType && (
            <p className='text-body-sm text-red mt-3'>{errors.queryType}</p>
          )}
        </div>

        <div className='mb-10'>
          <label htmlFor='message' className='text-body-sm mb-2 block pr-2'>
            Message <span className='text-green-600'>*</span>
          </label>
          <textarea
            name='message'
            id='message'
            className={`${errors.message ? 'border-red' : 'border-grey-500'} block min-h-60 w-full resize-none rounded-lg border-2 px-6 py-3 outline-none hover:border-green-600 focus:border-green-600 active:border-green-600 md:min-h-33 lg:min-h-26.25`}
          ></textarea>
          {errors.message && (
            <p className='text-body-sm text-red mt-2'>{errors.message}</p>
          )}
        </div>

        <div className='mb-10'>
          <label
            className={`flex cursor-pointer items-center gap-4 hover:text-green-600 hover:opacity-80`}
          >
            <input
              type='checkbox'
              name='terms'
              className="border-grey-500 h-5 w-5 cursor-pointer appearance-none rounded-none border-2 accent-green-200 transition duration-150 checked:border-green-600 checked:bg-[url('/images/icon-checkbox-check.svg')] checked:bg-center hover:border-2 hover:border-green-600"
            />
            <span className='text-body-sm text-center'>
              I consent to being contacted by the team <span>*</span>
            </span>
          </label>

          {errors.terms && (
            <p className='text-body-sm text-red mt-2'>{errors.terms}</p>
          )}
        </div>

        <button
          type='submit'
          className='text-body-md hover:bg-grey-900 w-full cursor-pointer rounded-lg bg-green-600 px-10 py-4 text-white'
        >
          Submit
        </button>
      </form>
    </main>
  );
}
