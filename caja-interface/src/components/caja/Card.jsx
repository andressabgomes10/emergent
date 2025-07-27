import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Card = forwardRef(({ className, children, hover = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-200 ease-in-out',
        hover && 'hover:scale-[1.02] hover:shadow-md cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center justify-between mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
})

CardTitle.displayName = 'CardTitle'

const CardIcon = forwardRef(({ className, children, color = 'orange', ...props }, ref) => {
  const colors = {
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    gray: 'bg-gray-100 text-gray-600'
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center',
        colors[color],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

CardIcon.displayName = 'CardIcon'

const CardContent = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('space-y-2', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'

const CardValue = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('text-3xl font-bold text-gray-900', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardValue.displayName = 'CardValue'

const CardDescription = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600', className)}
      {...props}
    >
      {children}
    </p>
  )
})

CardDescription.displayName = 'CardDescription'

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardIcon, 
  CardContent, 
  CardValue, 
  CardDescription 
}

