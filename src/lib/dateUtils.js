/**
 * Utility functions for handling dates without timezone issues
 */

/**
 * Parses a date string (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS) as local date without timezone conversion
 * @param {string} dateString - Date in YYYY-MM-DD format or ISO format
 * @returns {Date} Date object in local timezone
 */
export const parseLocalDate = (dateString) => {
    if (!dateString) return new Date();
    
    // Extract just the date part if it's a full timestamp
    const datePart = dateString.split('T')[0];
    
    // Split the date string to avoid timezone conversion
    const [year, month, day] = datePart.split('-').map(Number);
    
    // Validate parsed values
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        console.warn('Invalid date string:', dateString);
        return new Date();
    }
    
    // Create date in local timezone (month is 0-indexed)
    return new Date(year, month - 1, day);
};

/**
 * Formats a date string (YYYY-MM-DD or ISO) to display format (DD/MM/YYYY)
 * @param {string} dateString - Date in YYYY-MM-DD format or ISO format
 * @returns {string} Formatted date DD/MM/YYYY
 */
export const formatLocalDate = (dateString) => {
    if (!dateString) return '';
    
    const date = parseLocalDate(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Check if date is valid
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        console.warn('Invalid date for formatting:', dateString);
        return '';
    }
    
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
};

/**
 * Gets today's date in YYYY-MM-DD format (local timezone)
 * @returns {string} Today's date in YYYY-MM-DD format
 */
export const getTodayLocalDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};

/**
 * Converts a date to YYYY-MM-DD format for form inputs
 * @param {Date|string} date - Date object or date string
 * @returnsExtract just the date part if it's a full timestamp
        const datePart = date.split('T')[0];
        
        // If already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
            return datePart;
        }
        date = parseLocalDate(date);
    }
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Check if date is valid
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        console.warn('Invalid date for input format:', date);
        return getTodayLocalDate();
    }
    
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};
