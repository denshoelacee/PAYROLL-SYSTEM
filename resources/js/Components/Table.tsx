import * as React from 'react';
import { DataGrid, GridColDef,GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

type TableProps = {
    columns: GridColDef[];
    rows: any[];
    pageSize?: number;
    height?: number;
    sx ?: React.CSSProperties;
    pageSizeOptions?: number[];
    getRowId?: (row:any) => string | number;
    className?: string;
    checkboxSelection?:boolean;
    onRowSelectionModelChange?: (selection: GridRowSelectionModel) => void; // Updated type
    hideFooter?: boolean;

};

export default function Table({
    columns,
    rows,
    pageSize,
    height,
    pageSizeOptions,
    sx = {},
    getRowId,
    className,
    checkboxSelection,
    onRowSelectionModelChange,
    hideFooter = false
    
}: TableProps) {
    const paginationModel = { page: 0};
    const tableColor = '#16423C '; // deep teal
    return (
        <>
        <Paper sx={{ height, width: '100%', backgroundColor: 'transparent'}}>
            <DataGrid
                onRowSelectionModelChange={onRowSelectionModelChange}
                checkboxSelection={checkboxSelection}
                className={className}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { 
                    paginationModel:
                        { page: 0, 
                            pageSize:pageSize
                        } 
                    } 
                }}
                hideFooter={hideFooter}
                pageSizeOptions={pageSizeOptions }
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
                    backgroundColor: tableColor,
                    borderRadius: '0.375rem',
                    backgroundClip: 'padding-box',
                    border: 'none',
                    color: 'white',
                    '& .MuiDataGrid-cell': {
                    outline: 'none',
                    border: 'none',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 13,
                    padding:0
                    },
                    ' .MuiDataGrid-columnHeader': {
                    backgroundColor: tableColor,
                    color: 'white',
                    },

                    '& .MuiDataGrid-columnHeaders': {
                    fontSize: 13,
                    border: 'none !important',
                    backgroundColor: tableColor
                    },

                    '& .MuiDataGrid-footerContainer': {
                    backgroundColor: tableColor,
                    color: 'white',
                    border: 'none !important',
                    borderTop: '1px gray solid !important'
                    },

                    '& .MuiDataGrid-iconButtonContainer': {
                    visibility: 'visible',
                    width: 'auto',
                    opacity: 1,
                    },

                    '& .MuiDataGrid-menuIcon': {
                    display: 'none',
                    },
                    '& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within': {
                    outline: 'none',
                    border: 'none',
                    },

                    '& .MuiDataGrid-columnHeader:focus': {
                    outline: 'none',
                    },
                    '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#2F5249',
                    },

                    '& .MuiTablePagination-root, .MuiTablePagination-selectLabel, .MuiSelect-select, .MuiSvgIcon-root': {
                    color: 'white',
                    },

                    '& .MuiDataGrid-columnSeparator': {
                    display: 'none',
                    },

                    '& .MuiDataGrid-sortButton': {
                    opacity: '1 !important',
                    },
                    '& .MuiDataGrid-sortIcon': {
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
                    backgroundColor: 'mainColor !important',
                    height: '0 !important',
                    },
                    '& .MuiDataGrid-container--top [role="row"], .MuiDataGrid-container--bottom [role="row"]': {
                    width: '100% !important',      // removes excess width
                    backgroundColor: tableColor,     // sets background
                    margin: 0,
                    padding: 0,
                    border: 0,
                    outline: 0,
                    },
                    '& .MuiDataGrid-virtualScrollerContent': {
                    flexGrow: 120,
                    backgroundColor: tableColor
                    },
                    '& .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-filler': {
                        width: '0 !important',
                        height: '0 !important',
                        backgroundColor: tableColor,
                    },
                    '& .MuiDataGrid-columnHeader': {
                    outline: 'none',
                    border: 'none !important' ,
                    borderBottom: '1px solid gray !important' ,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-row.Mui-selected , & .MuiDataGrid-row.Mui-selected:hover' :{
                    backgroundColor: tableColor,
                    },
                    
                    ...sx}}
            />
        </Paper>
        </>

    );
}
