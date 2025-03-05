
/**
 * Format a number as a currency string
 * @param amount - The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format a date string into a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Shorten a long string with ellipsis
 * @param str - The string to shorten
 * @param maxLength - Maximum length before truncating
 * @returns Shortened string with ellipsis if needed
 */
export const truncateString = (str: string, maxLength: number = 20): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};
