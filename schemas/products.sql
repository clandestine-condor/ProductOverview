DROP DATABASE products;

CREATE DATABASE products;

\c products;

CREATE TABLE products (
  product_id integer PRIMARY KEY,
  name varchar(50),
  slogan varchar(100),
  description varchar(250),
  category varchar(50),
  default_price integer NOT NULL,
);

CREATE TABLE features (
  feature_id integer PRIMARY KEY
  product_id integer,
  feature varchar(100),
  value varchar(100),

  FOREIGN KEY(product_id)
    REFERENCES products(product_id)
    ON DELETE CASCADE
);

CREATE INDEX idx_product_id ON features (product_id)

CREATE TABLE related_products (
  id integer PRIMARY KEY,
  product_id integer,
  related_product_id integer,

  FOREIGN KEY(product_id)
    REFERENCES products(product_id)
    ON DELETE CASCADE
);

CREATE INDEX idx_product_id ON related_products (product_id)

CREATE TABLE styles (
  style_id integer PRIMARY KEY,
  product_id integer,
  name varchar(100) NOT NULL,
  original_price integer NOT NULL,
  sale_price integer,
  "default?" boolean,

  FOREIGN KEY(product_id)
    REFERENCES products(product_id)
    ON DELETE CASCADE
);

CREATE INDEX idx_product_id ON styles (product_id)

CREATE TABLE photos (
  id integer PRIMARY KEY,
  style_id integer,
  thumbnail_url text,
  url text,

  FOREIGN KEY(style_id)
    REFERENCES styles(style_id)
      ON DELETE CASCADE
)

CREATE INDEX idx_style_id ON photos (style_id)

CREATE TABLE sku (
  sku_id integer PRIMARY KEY,
  style_id integer,
  quantity integer NOT NULL,
  size char(2) NOT NULL,

  FOREIGN KEY(style_id)
    REFERENCES styles(style_id)
      ON DELETE CASCADE
)

CREATE INDEX idx_style_id ON sku (style_id)