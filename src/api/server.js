require('newrelic');
require('dotenv').config()
const knexfile = require("../knexfile.js")
const knex = require('knex')(knexfile);
const express = require('express')

const app = express()

const port = 3000


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products', async(req, res) => {
  const results = await knex.select().from('products').limit(5)
  res.send(results)
})

const getProductByProductId = async (productId) => {
  const jsonAggSelectFeatureValue = knex.raw(`json_agg(
    json_build_object('feature', feature, 'value', value)
  ) fp`)
  const featuresValuesGroupedByProductId = knex('features')
  .select('product_id', jsonAggSelectFeatureValue)
  .groupBy('product_id')
  .as('fa')
  .where({product_id: productId})

  const [result] = await knex('products')
  .select('id', 'name', 'slogan', 'description', 'category', 'default_price', 'fa.fp as features')
  .join(featuresValuesGroupedByProductId, 'product_id', 'id')
  .where({id: productId})

  return result;
}


app.get('/products/:product_id', async(req, res) => {
  const product_id = req.params.product_id
  const result = await getProductByProductId(product_id)
  res.send(result)
})

const getProductStylesByProductId = async (productId) => {
  const skuAggregate = knex.raw(
    `jsonb_object_agg(
      sku.id,
      json_build_object('quantity', quantity, 'size', size)
    ) as skus`
  )

  const groupSkuValuesByStyleId = knex('sku').select(skuAggregate).where(knex.raw(`sku.style_id = styles.id`)).groupBy('style_id')

  const photosAggregate = knex.raw(
    `json_agg(
      json_build_object('thumbnail url', thumbnail_url, 'url', url)
     ) as photos`
  )

  const groupPhotosByStyleId = knex('photos').select(photosAggregate).where(knex.raw(`photos.style_id = styles.id`)).groupBy('photos.style_id')

  const buildStylesAggObject = knex.raw(
    `json_build_object(
      'style_id',
          id,
          'name',
          name,
          'original_price',
          original_price,
          'sale_price',
          sale_price,
          'default',
          default_style,
          'photos',
          (${groupPhotosByStyleId}),
          'skus',
         (${groupSkuValuesByStyleId})
    )`
  )

  const [groupStylesByProductId] = await knex('styles').select('product_id', knex.raw(`json_agg(${buildStylesAggObject}) as results`)).where({'product_id': productId}).groupBy('product_id')

  return groupStylesByProductId;
}

app.get('/products/:product_id/styles', async(req, res) => {
  const product_id = req.params.product_id
  const results = await getProductStylesByProductId(product_id)
  res.send(results)
})

const getRelatedProductsByProductId = async (productId) => {
  const relatedProductsByProductIdAggregate = knex.raw(`json_agg(related_product_id) related_products`)
  const [relatedProductsByProductId] = await knex('related_products').select(relatedProductsByProductIdAggregate).where({current_product_id: productId}).groupBy('current_product_id')

  return relatedProductsByProductId
}

app.get('/products/:product_id/related', async(req, res) => {
  const product_id = req.params.product_id
  const {related_products} = await getRelatedProductsByProductId(product_id)
  res.send(related_products)
})
