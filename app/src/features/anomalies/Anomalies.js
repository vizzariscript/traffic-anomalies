import React from 'react'
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
export const Anomalies = (props) => {
    const { anomalies, downloadCsv } = props;
    // const dataString = JSON.stringify(anomalies);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'anomalie', headerName: 'Anomalie', width: 130 },
    ];
    return (
        <>
            <div style={{ width: '100%' }}>
                <DataGrid autoHeight={true} hideFooter={true}  rows={anomalies} columns={columns} pageSize={5} />
            </div>
            <Button variant="contained" color="primary" onClick={() => { downloadCsv() }}>
                Download
            </Button>
        </>
    );
}