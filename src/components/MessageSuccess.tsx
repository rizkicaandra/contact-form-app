import Image from 'next/image';

export default function MessageSuccess() {
  return (
    <div className='absolute -top-8 mt-6 max-w-80 transform rounded-xl bg-green-900 p-6 text-white transition-all duration-500 ease-in-out md:-top-32 md:max-w-120'>
      <h1 className='text-body-md mb-2 flex gap-2'>
        <Image
          src='/images/icon-success-check.svg'
          alt='icon success'
          width={24}
          height={24}
        ></Image>
        Message Sent!
      </h1>
      <p className='text-body-sm'>
        Thanks for completing the form. We’ll be in touch soon!
      </p>
    </div>
  );
}
