const { faker } = require("@faker-js/faker");
const pool = require("../src/db/connection");

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home",
  "Toys"
];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

async function seedProducts() {
  try {
    console.log("Starting seed process...");

    for (let offset = 0; offset < TOTAL_PRODUCTS; offset += BATCH_SIZE) {
      const values = [];
      const placeholders = [];

      for (let i = 0; i < BATCH_SIZE && offset + i < TOTAL_PRODUCTS; i++) {
        const name = faker.commerce.productName();
        const category =
          categories[Math.floor(Math.random() * categories.length)];

        const price = faker.number.float({
          min: 100,
          max: 10000,
          fractionDigits: 2,
        });

        const createdAt = faker.date.past();
        const updatedAt = new Date(createdAt);

        const index = i * 5;

        placeholders.push(
          `($${index + 1}, $${index + 2}, $${index + 3}, $${index + 4}, $${index + 5})`
        );

        values.push(
          name,
          category,
          price,
          createdAt,
          updatedAt
        );
      }

      await pool.query(
        `
        INSERT INTO products
        (name, category, price, created_at, updated_at)
        VALUES ${placeholders.join(",")}
        `,
        values
      );

      console.log(
        `Inserted ${Math.min(
          offset + BATCH_SIZE,
          TOTAL_PRODUCTS
        )} products`
      );
    }

    console.log("Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedProducts();