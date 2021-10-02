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

app.get('/products/:product_id', async(req, res) => {
  const product_id = req.params.product_id
  const results = await knex.raw(
    `select
    products.id,
    name,
    slogan,
    description,
    category,
    default_price,
    fa.fp features
    from
    products
    join (
        select
            product_id,
            json_agg(
                json_build_object('feature', feature, 'value', value)
            ) fp
        from
            features
        group by
            product_id
    ) fa on product_id = products.id
    where products.id = ${product_id};`
)
  res.send(results.rows[0])
})


app.get('/products/:product_id/styles', async(req, res) => {
  const product_id = req.params.product_id
  const results = await knex.raw(
  `
  select
  product_id,
  json_agg(
      json_build_object(
          'style_id',
          id,
          'name',
          name,
          'original_price',
          original_price,
          'sale_price',
          sale_price,
          'default?',
          default_style,
          'photos',
          (
              select
                  json_agg(
                      json_build_object('thumbnail url', thumbnail_url, 'url', url)
                  ) photos
              from
                  photos
              where
                  photos.style_id = styles.id
              group by
                  photos.style_id
          ),
          'skus',
          (
              select
                  jsonb_object_agg(
                      sku.id,
                      json_build_object('quantity', quantity, 'size', size)
                  ) skus
              from
                  sku
              where
                  sku.style_id = styles.id
              group by
                  style_id
          )
      )
  ) results
from
  styles
  where product_id = ${product_id}
group by
  product_id
`
)
  res.send(results.rows[0])
})

app.get('/products/:product_id/related', async(req, res) => {
  const product_id = req.params.product_id
  const results = await knex.raw(`select json_agg(related_product_id) AS related_products FROM related_products WHERE current_product_id = ${product_id} GROUP BY current_product_id;`)
  res.send(results.rows[0].related_products)
})
