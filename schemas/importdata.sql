COPY products(id, name, slogan, description, category, default_price) FROM '/home/andylei/hackreactor/ProductOverview/data/product.csv' DELIMITER ',' CSV HEADER;

COPY features(id, product_id, feature, value) FROM '/home/andylei/hackreactor/ProductOverview/data/features.csv' DELIMITER ',' CSV HEADER;

COPY styles(id, product_id, name, sale_price, original_price, default_style) FROM '/home/andylei/hackreactor/ProductOverview/data/styles.csv' DELIMITER ',' CSV HEADER;

COPY photos(id, style_id, url, thumbnail_url) FROM '/home/andylei/hackreactor/ProductOverview/data/photos.csv' DELIMITER ',' CSV HEADER;

COPY sku(id, style_id, size, quantity) FROM '/home/andylei/hackreactor/ProductOverview/data/skus.csv' DELIMITER ',' CSV HEADER;

COPY related_products(id, current_product_id, related_product_id) FROM '/home/andylei/hackreactor/ProductOverview/data/related.csv' DELIMITER ',' CSV HEADER;