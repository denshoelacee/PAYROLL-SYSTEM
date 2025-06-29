import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

type TableProps = {
    columns: GridColDef[];
    rows: any[];
    pageSize?: number| string;
    height?: number;
    sx ?: React.CSSProperties;
    pageSizeOptions?: number[];
    getRowId?: (row:any) => string | number;
    className?: string;
};

export default function Table({
    columns,
    rows,
    pageSize,
    height,
    pageSizeOptions,
    sx = {},
    getRowId,
    className
    
}: TableProps) {
    const paginationModel = { page: 0};

    return (
        <>
        <Paper sx={{ height, width: '100%', backgroundColor: 'transparent'}}>
            <DataGrid
                className={className}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { 
                    paginationModel:
                        { page: 0, 
                            pageSize:10
                        } 
                    } 
                }}
                pageSizeOptions={pageSizeOptions }
                checkboxSelection={false}
                disableRowSelectionOnClick
                disableColumnMenu={true}
                disableColumnResize
                localeText={{
                    noRowsLabel: 'No records found',
                    noResultsOverlayLabel: 'No matching results',
                }}
                getRowId={getRowId}
                sx={{
                    mb: 8,
                    backgroundColor: 'rgba(220, 252, 231, 0.1)',
                    borderRadius: '0.375rem',
                    backgroundClip: 'padding-box',
                    border: '1px solid',
                    borderColor: 'button.borderColor',
                    color: 'white',

                    '.MuiDataGrid-cell': {
                    outline: 'none',
                    border: 'none',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    },
                    '.MuiDataGrid-columnHeader': {
                    backgroundColor: 'rgba(220, 252, 231, 0.1)',
                    color: 'white',
                    },

                    '.MuiDataGrid-columnHeaders': {
                    fontSize: 15,
                    },

                    '.MuiDataGrid-footerContainer': {
                    backgroundColor: 'rgba(220, 252, 231, 0.1)',
                    color: 'white',
                    },

                    '.MuiDataGrid-iconButtonContainer': {
                    visibility: 'visible',
                    width: 'auto',
                    opacity: 1,
                    },

                    '.MuiDataGrid-menuIcon': {
                    display: 'none',
                    },

                    '.MuiDataGrid-row:hover': {
                    backgroundColor: 'rgba(74, 222, 128, 0.2)',
                    },

                    '.MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within': {
                    outline: 'none',
                    border: 'none',
                    },

                    '.MuiDataGrid-columnHeader:focus': {
                    outline: 'none',
                    },

                    '.MuiDataGrid-row.Mui-selected': {
                    outline: 'none',
                    },

                    '.MuiDataGrid-row.Mui-selected:hover': {
                    backgroundColor: 'rgba(74, 222, 128, 0.2)',
                    },

                    '.MuiTablePagination-root, .MuiTablePagination-selectLabel, .MuiSelect-select, .MuiSvgIcon-root': {
                    color: 'white',
                    },

                    '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                    },

                    '& .MuiDataGrid-sortButton': {
                    opacity: '1 !important',
                    },
                    '& .MuiDataGrid-sortIcon': {
                    opacity: '1 !important',
                    visibility: 'visible !important',
                    display: 'inline-flex !important',
                    }, 
                    '& .MuiDataGrid-columnHeader:focus-within': {
                    outline: 'none !important',
                    boxShadow: 'none !important',
                    },
                    '& .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important',
                    boxShadow: 'none !important',
                    },
                    '.MuiDataGrid-scrollbar--vertical': {
                    display: 'none',
                    },
                    '.MuiDataGrid-scrollbar--horizontal': {
                    visibility: 'hidden ',
                    },
                    '& .MuiDataGrid-scrollbarFiller': {
                    minWidth: '0 !important',
                    width: '0 !important',
                    },
                    '& .MuiDataGrid-filler': {
                    backgroundColor: '#012424 !important',
                    height: '0 !important',
                    },
                    '.MuiDataGrid-container--top [role="row"], .MuiDataGrid-container--bottom [role="row"]': {
                    width: '100% !important',      // removes excess width
                    backgroundColor: '#012424',      // sets background
                    margin: 0,
                    padding: 0,
                    },
                    '.MuiDataGrid-virtualScrollerContent': {
                    flexGrow: 120,
                    backgroundColor: 'rgba(220, 252, 231, 0.1)',
                    
                    },
                    ...sx}}
            />
        </Paper>
        </>

    );
}
