import { createSlice } from '@reduxjs/toolkit';
const anomaliesSlice = createSlice({
  name: 'anomalies',
  initialState: {
    fetching: true,
    anomalies: [],
  },
  reducers: {
    fetchAnomalies: state => {
      state.fetching = true;
    },
    setAnomalies: (state, action) => {
      state.fetching = false;
      state.anomalies = action.payload;

    }
  },
});

const { fetchAnomalies, setAnomalies } = anomaliesSlice.actions;
export const getAnomalies = () => async dispatch => {
  dispatch(fetchAnomalies());
  // llamada a api const data = llama;
  const data = await getAllAnomalies();
  //JUST FOR FUN
  await new Promise(resolve => setTimeout(resolve, 2000));

  dispatch(setAnomalies(data))
};

export const getCsvFile = () => async () => {
  await downloadCsvFile();
};

const getAllAnomalies = async () => {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch('http://localhost:8080/api/anomalies', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImludGVsbGlzaXRlX2lkIiwiaWF0IjoxNjE0NDgyMTY4LCJleHAiOjE2MTQ0OTY1Njh9.QBx1eLLK7VYwIT-0A002L4krAKutKT3SFBV47Ko6GuM'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  if (!response.ok) {
     if (response.status === 401) {
       console.warn('unauthorized')
     }
     if (response.status === 500) {
       //TODO
     }
    return []
  }
  return response.json();
}

const downloadCsvFile = async () => {
  // Opciones por defecto estan marcadas con un *
  return fetch('http://localhost:8080/api/anomalies/csvfile/', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'text/csv'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }).then((response) => response.blob())
    .then((blob) => {
      downloadBlob(blob, 'anomalies-report.csv')
    })
}

const downloadBlob = (blob, fileName) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
}


export const anomaliesSelector = state => state.anomalies.anomalies;
export const anomaliesFetchingSelector = state => state.anomalies.fetching;

export default anomaliesSlice.reducer;
