import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-[var(--caja-orange)] text-white hover:bg-[var(--caja-orange-dark)] hover:scale-105 focus:ring-[var(--caja-orange)]',
    secondary: 'bg-transparent text-[var(--caja-orange)] border border-[var(--caja-orange)] hover:bg-[var(--caja-orange)] hover:text-white hover:scale-105 focus:ring-[var(--caja-orange)]',
    tertiary: 'bg-transparent text-[var(--caja-orange)] hover:bg-[var(--caja-gray-light)] hover:scale-105 focus:ring-[var(--caja-orange)]',
    success: 'bg-[var(--success)] text-white hover:bg-green-700 hover:scale-105 focus:ring-green-500',
    error: 'bg-[var(--error)] text-white hover:bg-red-700 hover:scale-105 focus:ring-red-500',
    warning: 'bg-[var(--warning)] text-gray-900 hover:bg-yellow-500 hover:scale-105 focus:ring-yellow-500',
    info: 'bg-[var(--info)] text-white hover:bg-cyan-700 hover:scale-105 focus:ring-cyan-500'
  }
  
  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-sm rounded-md',
    lg: 'h-12 px-6 text-base rounded-lg'
  }
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }

