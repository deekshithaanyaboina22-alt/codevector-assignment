const pool = require("../db/connection");

const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;
    const cursor = req.query.cursor;

    let query = `
      SELECT *
      FROM products
    `;

    const values = [];
    const conditions = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (cursor) {
      values.push(cursor);
      conditions.push(`created_at < $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += `
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    const result = await pool.query(query, values);

    const products = result.rows;

    const nextCursor =
      products.length > 0
        ? products[products.length - 1].created_at
        : null;

    res.json({
      products,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};

module.exports = {
  getProducts,
};