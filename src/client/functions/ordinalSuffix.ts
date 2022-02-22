/**
 * Obtains the suffix of a number
 * @param number - The number to get the suffix of (e.g. 1st, 2nd, 3rd, 4th, etc.)
 * @returns The suffix of the number
 */
export let ordinalSuffix = (number: number) => {
    const j = number % 10;
    const k = number % 100;
  
    if (j == 1 && k != 11) return number + 'st';
    if (j == 2 && k != 12) return number + 'nd';
    if (j == 3 && k != 13) return number + 'rd';
  
    return number + 'th';
}