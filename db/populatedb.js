#! /usr/bin/env node

const pool = require("./pool");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  number_in_stock INTEGER NOT NULL CHECK (number_in_stock >= 0),
  category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT
);

-- Insert categories if they don't exist
INSERT INTO categories (name, description) 
VALUES 
  ('Produce', 'Fresh fruits, vegetables, and greens.'),
  ('Dairy & Eggs', 'Milk, cheese, butter, yogurt, and eggs.'),
  ('Bakery', 'Freshly baked bread, rolls, and pastries.'),
  ('Frozen Foods', 'Frozen meals, ice cream, vegetables, and fruits.')
ON CONFLICT (name) DO NOTHING;

-- Insert items
INSERT INTO items (name, description, price, number_in_stock, category_id)
VALUES
  ('Organic Bananas', 'Fresh organic bananas per bunch', 1.99, 50, (SELECT id FROM categories WHERE name = 'Produce')),
  ('Honeycrisp Apples', 'Crisp and sweet apples, 3lb bag', 4.49, 30, (SELECT id FROM categories WHERE name = 'Produce')),
  ('Whole Milk (1 Gal)', 'Grade A pasteurized whole milk', 3.79, 20, (SELECT id FROM categories WHERE name = 'Dairy & Eggs')),
  ('Large White Eggs (12ct)', 'Grade A large cage-free white eggs', 2.99, 40, (SELECT id FROM categories WHERE name = 'Dairy & Eggs')),
  ('Sourdough Bread', 'Artisanal sourdough bread loaf', 4.29, 15, (SELECT id FROM categories WHERE name = 'Bakery')),
  ('Vanilla Ice Cream (1 pt)', 'Rich and creamy vanilla bean ice cream', 3.49, 25, (SELECT id FROM categories WHERE name = 'Frozen Foods'));
`;

async function main() {
  console.log("Seeding database...");

  try {
    // Reuse the application's connection configuration so both scripts
    // always target the same database.
    await pool.query(SQL);
    console.log("Database successfully populated with dummy data!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await pool.end();
  }
}

main();
