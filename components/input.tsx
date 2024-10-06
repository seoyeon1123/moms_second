import { InputHTMLAttributes } from 'react';

interface Input {
  errors?: string[];
  name: string;
  type: string;
  placeholder: string;
}
export default function Input({
  errors = [],
  name,
  type,
  placeholder,
  ...rest
}: Input & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      {type === 'textarea' ? (
        <textarea
          className="w-full min-w-[350px] min-h-36 bg-white border-2 rounded-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500   resize-none overflow-auto whitespace-pre-wrap transition-all duration-200 ease-in-out"
          name={name}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="w-full min-w-[350px] bg-white border-2 rounded-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 ease-in-out "
          {...rest}
          name={name}
          placeholder={placeholder}
        />
      )}
      {errors.map((error, index) => (
        <div key={index} className="text-sm font-semibold text-red-600">
          {error}
        </div>
      ))}
    </>
  );
}
