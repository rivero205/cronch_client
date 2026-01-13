/**
 * Utility functions for handling dates without timezone issues
 */

/**
 * Parses a date string (YYYY-MM-DD) as local date without timezone conversion
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Date} Date object in local timezone
 */
export const parseLocalDate = (dateString) => {
    if (!dateString) return new Date();

    // If it's a full timestamp, create a Date object directly
    if (dateString.includes('T')) {
        return new Date(dateString);
    }
    
    // Add 'T00:00:00' to treat the date as local
    return new Date(`${dateString}T00:00:00`);
};

/**
 * Formats a date string (YYYY-MM-DD) to display format (DD/MM/YYYY)
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date DD/MM/YYYY
 */
export const formatLocalDate = (dateString) => {
    if (!dateString) return '';
    
    const date = parseLocalDate(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
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
 * @returns {string} Date in YYYY-MM-DD format
 */
export const toInputDateFormat = (date) => {
    if (!date) return getTodayLocalDate();
    
    if (typeof date === 'string') {
        // If already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return date;
        }
        date = parseLocalDate(date);
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};
