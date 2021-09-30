const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Products');
  db.on('error', console.error('Unable to connect to database'))
  db.once('open', () => {
    console.log('Connected to Products database!')
  });

  const productSchema = new Schema({
    productID: {
      type: Number,
      unique: true,
      required: true,
      dropDups: true
    }
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: Number
    features: [{feature: String, value: String}],
  })
  const Product = mongoose.model('product', productSchema);


  const productStylesSchema = new Schema ({
    productID: mongoose.Schema.Types.ObjectId,
    style_id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    'default?': Boolean,
    photos: [
      {
        thumbnail_url: String,
        url: String,
      }
    ],
    skus: [mongoose.Schema.Types.ObjectId]
  });
  const productStyles = mongoose.model('product_styles', productStylesSchema);

  const SKUSchema = new Schema ({
    size: String,
    quantity: Number,
  })
  const sku = mongoose.model('sku', SKUSchema);

  const relatedProductsSchema = new Schema ({
    productID: mongoose.Schema.Types.ObjectId,
    related_products: [mongoose.Schema.Types.ObjectId]
  })

  const relatedProducts = mongoose.model('related_products', relatedProductsSchema)
}




