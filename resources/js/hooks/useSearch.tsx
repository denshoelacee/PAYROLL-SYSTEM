import { useMemo } from 'react';

/**
 * Pure hook to filter a list based on search query
 */
export default function useSearch<T>(searchQuery: string, list: T[]): T[] {
    const lowerQuery = searchQuery.toLowerCase();

    return useMemo(() => {
        return list.filter((item) =>
        Object.values(item as Record<string, unknown>).some(
            (value) =>
            value &&
            value.toString().toLowerCase().includes(lowerQuery)
        )
        );
    }, [searchQuery, list]);
}
