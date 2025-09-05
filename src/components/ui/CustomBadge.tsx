// components/ui/custom-badge.tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CustomBadgeProps {
  variant: 'success' | 'warning' | 'destructive' | 'secondary' | 'default' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export function CustomBadge({ variant, children, className }: CustomBadgeProps) {
  const variantClasses = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    destructive: 'bg-red-100 text-red-800 border-red-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    default: 'bg-blue-100 text-blue-800 border-blue-200',
    outline: 'border border-gray-300'
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(variantClasses[variant], className)}
    >
      {children}
    </Badge>
  );
}