import { type InputHTMLAttributes, forwardRef } from "react";

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string
};

export const Input = forwardRef<HTMLInputElement, TInput>(
  function InputElement({ label, id, name, value, ...rest }, ref) {
    return (
      <div className="grid w-full items-center gap-1.5">
        {label && (
          <label htmlFor={id} className="pl-1 mb-1 inline-block font-semibold">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          name={name}
          value={value}
          className="border-2 border-primary bg-red transition h-12 px-5 rounded-md focus:outline-none w-full text-black text-lg"
          {...rest}
        />
      </div>
    );
  }
);
