import { useEffect, useState } from 'react';

/**
 *  REUSABLE HOOKS FOR SEARCH THAT FILTERS DATA BASED ON SEARCH QUERY
 * @param searchQuery - INPUT QUERY FROM PARENT 
 * @param list - ARRAY LIST OF DATAS
 * @returns FILTERED ARRAY LIST OF DATA BAED ON SEARCHQUERY
 */

export default function useSearch<T>(searchQuery: string, list: T[]): T[] {
    const [filteredRows, setFilteredRows] = useState<T[]>(list);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();

        const results = list.filter((item) =>
            Object.values(item as Record<string, unknown>).some(
                (value) =>
                    value &&
                    value.toString().toLowerCase().includes(lowerQuery)
            )
        );

        setFilteredRows(results);
    }, [searchQuery, list]);

    return filteredRows;
}
