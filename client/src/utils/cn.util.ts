import { clsx,ClassValue } from "clsx";
import {twMerge} from 'tailwind-merge'
/**
 * Combines multiple class names into a single string.
 * 
 * This utility function merges class names using `clsx` and `twMerge` to handle conditional 
 * class names and Tailwind CSS class name conflicts.
 * 
 * @param {...ClassValue[]} styles - An array of class names or objects representing conditional class names.
 * @returns {string} - A single string containing the merged class names.
 */
export const cn = (...styles: ClassValue[]): string => {
    return twMerge(clsx(styles))
}