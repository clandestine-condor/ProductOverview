const csv = require('csv-parser')
const fs = require('fs')

const getCsvData = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
    .pipe(csv({
      mapValues: ({value}) => {
        const integer = Number(value)
        if (isNaN(integer)) {
          return value
        }
        return integer
      }
    }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve(results);
    })
    .on('error', (err) => {
      reject(err)
    });
  })
}

module.exports = getCsvData;


