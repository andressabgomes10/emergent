import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef(({ 
  className, 
  type = 'text', 
  label,
  error,
  helper,
  required,
  ...props 
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={inputId}
        className={cn(
          'w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md',
          'placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-[var(--caja-orange)] focus:ring-opacity-20 focus:border-[var(--caja-orange)]',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'transition-all duration-200 ease-in-out',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20',
          className
        )}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      
      {error && (
        <p 
          id={`${inputId}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p 
          id={`${inputId}-helper`}
          className="text-sm text-gray-500"
        >
          {helper}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

const TextArea = forwardRef(({ 
  className, 
  label,
  error,
  helper,
  required,
  rows = 4,
  ...props 
}, ref) => {
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md resize-vertical',
          'placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-[var(--caja-orange)] focus:ring-opacity-20 focus:border-[var(--caja-orange)]',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'transition-all duration-200 ease-in-out',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20',
          className
        )}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${textareaId}-error` : helper ? `${textareaId}-helper` : undefined
        }
        {...props}
      />
      
      {error && (
        <p 
          id={`${textareaId}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p 
          id={`${textareaId}-helper`}
          className="text-sm text-gray-500"
        >
          {helper}
        </p>
      )}
    </div>
  )
})

TextArea.displayName = 'TextArea'

const Select = forwardRef(({ 
  className, 
  label,
  error,
  helper,
  required,
  children,
  placeholder,
  ...props 
}, ref) => {
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        id={selectId}
        className={cn(
          'w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-[var(--caja-orange)] focus:ring-opacity-20 focus:border-[var(--caja-orange)]',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'transition-all duration-200 ease-in-out',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20',
          className
        )}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${selectId}-error` : helper ? `${selectId}-helper` : undefined
        }
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      
      {error && (
        <p 
          id={`${selectId}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p 
          id={`${selectId}-helper`}
          className="text-sm text-gray-500"
        >
          {helper}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export { Input, TextArea, Select }

