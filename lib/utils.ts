import clsx from 'clsx'

export function cn(...inputs: any[]) {
  // Simple className helper. Avoids depending on `tailwind-merge` in this
  // environment where optional packages may be missing.
  return clsx(...inputs)
}
