import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Anomalies } from './Anomalies'
import {anomaliesSelector} from './anomaliesSlice'
import {anomaliesFetchingSelector} from './anomaliesSlice'

import {
  getAnomalies,
  getCsvFile
} from './anomaliesSlice';

export function AnomaliesContainer() {
  const anomalies = useSelector(anomaliesSelector);
  const isFetching = useSelector(anomaliesFetchingSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnomalies())
  }, [])

  const downloadCsvFile = () => {
    dispatch(getCsvFile())
  }

  if (isFetching) {
    return (
      <h2>
        Loading...
      </h2>
    )
  }
  
  return (
    <Anomalies anomalies={anomalies} downloadCsv={downloadCsvFile}/>
  );
}
