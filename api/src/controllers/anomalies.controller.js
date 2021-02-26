const { Parser } = require('json2csv');

const getAll = async (req, res, next) => {
    res.status(200);
    res.json({ OK: 'OK' });
}

const getCsvFile = async (req, res, next) => {
    const anomalies = [
        {
            "id": 1,
            "anomalie": "lorem ipsum 1",
        },
        {
            "id": 2,
            "anomalie": "lorem ipsum 2",
        },
        {
            "id": 3,
            "anomalie": "lorem ipsum 3",
        }
    ];

    const json2csv = new Parser();
    const csv = json2csv.parse(anomalies);
    res.header('Content-Type', 'text/csv');
    res.attachment('Anomalies-report.csv');
    res.send(csv);
}

module.exports = {
    getAll,
    getCsvFile,
}