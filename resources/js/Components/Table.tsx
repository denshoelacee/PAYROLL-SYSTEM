import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

type TableProps = {
    columns: GridColDef[];
    rows: any[];
    pageSize?: number;
    height?: number;
    sx ?: React.CSSProperties;
    pageSizeOptions?: number[];
};

export default function Table({
    columns,
    rows,
    pageSize,
    height,
    pageSizeOptions,
    sx = {}
    
}: TableProps) {
    const paginationModel = { page: 0, pageSize };

    return (
        <>
        <Paper sx={{ height, width: '100%', backgroundColor: 'transparent'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={pageSizeOptions}
                checkboxSelection={false}
                disableRowSelectionOnClick
                disableColumnMenu={true}
                disableColumnResize
                localeText={{
                    noRowsLabel: 'No records found',
                    noResultsOverlayLabel: 'No matching results',
                }}
                pageSize={pageSize}
                height={height}
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

                    '.MuiDataGrid-iconButtonContainer': {
                    visibility: 'visible',
                    width: 'auto',
                    opacity: 1,
                    },

                    '.MuiDataGrid-menuIcon': {
                    display: 'none',
                    },

                    '.MuiDataGrid-footerContainer': {
                    backgroundColor: 'rgba(220, 252, 231, 0.1)',
                    color: 'white',
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
                    '.MuiDataGrid-overlay': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay
                    backdropFilter: 'blur(5px)', // optional: adds a blur effect
                    height: '430px',
                    },
                    ...sx}}
            />
        </Paper>
        </>

    );
}
