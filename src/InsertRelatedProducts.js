const getCsvData = require('./api/helpers/getCsvData.js')
const chunk = require('lodash/chunk')
const knexfile = require("./knexfile")
const knex = require('knex')(knexfile);
const path = require('path')

const init = async () => {
  const relatedProducts = await getCsvData(path.join(__dirname, '../data/related.csv' ))

  const cleanRelatedProducts = relatedProducts.filter((relatedProduct) => relatedProduct.related_product_id !== 0 )

  const chunkedRelatedProducts = chunk(cleanRelatedProducts, 10_000)
  console.time('process')
  for (const relatedProductChunk of chunkedRelatedProducts) {
    console.time('batch')
    console.log(`processing chunk ${relatedProductChunk[0]?.id} - ${relatedProductChunk[relatedProductChunk.length - 1]?.id}`)
    try {
      await knex('related_products').insert(relatedProductChunk)
    } catch(err) {
      console.error(err)
      throw new Error(err)
    }
    console.timeEnd('batch')
  }
  console.timeEnd('process')
  process.exit()
}

init()