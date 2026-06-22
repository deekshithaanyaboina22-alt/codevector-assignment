# CodeVector Backend Assignment

## Overview

This project is a backend service for browsing a large product catalog of 200,000 products.

The system supports:

* Category filtering
* Cursor-based pagination
* Fast retrieval of products sorted by newest first
* Stable pagination while data changes

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Neon Database

## Features

### Product Browsing

Fetch products sorted by newest first.

### Category Filtering

Filter products by category.

Example:

GET /products?category=Books

### Cursor Pagination

Fetch products using cursor-based pagination.

Example:

GET /products?limit=20

GET /products?limit=20&cursor=<cursor>

### Seed Script

A seed script generates 200,000 products and inserts them into PostgreSQL efficiently using batch inserts.

## API Endpoint

### GET /products

Query Parameters:

* limit
* category
* cursor

Response:

* products
* nextCursor

## Design Decisions

### Why PostgreSQL?

PostgreSQL provides efficient indexing and querying for large datasets and is suitable for production workloads.

### Why Cursor Pagination?

Cursor pagination avoids the duplicate and missing record issues that can occur with offset pagination when data changes during browsing.

### Why Indexes?

Indexes were created on frequently queried columns to improve performance for filtering and sorting operations.

## Running Locally

Install dependencies:

npm install

Start server:

node server.js

## Future Improvements

* Composite cursor using created_at and id
* Product search support
* Automated testing
* API documentation
* Caching layer for frequently accessed queries
