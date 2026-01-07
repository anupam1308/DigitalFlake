Digitalflake Admin Clone
A simple full‑stack CRUD app that mimics the Digitalflake admin UI for managing Categories, Subcategories, and Products.

Tech Stack
Frontend

React (SPA with React Router)

Axios for API requests

Tailwind CSS for styling

Backend

Node.js

Express

Features
Category
View list of categories with:

Id, Name, Image, Status

Initial demo data:

Mobile, Laptop, Grocery

Supports basic CRUD via REST endpoints.

Subcategory
View list of subcategories with:

Id, Name, Image, Parent Category, Status

Subcategories are linked to categories via categoryId.

Used as a dependent dropdown for Products.

Product
View list of products with:

Id, Name, Image, Subcategory, Category, Status

Add / Edit Product:

Product Name text input

Category dropdown (Mobile, Laptop, Grocery)

Subcategory dropdown filtered by selected category

Status dropdown (Active / Inactive)

Image URL is auto‑picked in the backend or form based on product name (e.g. Motorola, HP, Apple).

## Screenshots 
<img width="1280" height="800" alt="image" src="https://github.com/user-attachments/assets/6e1b03bb-9400-4574-8b78-7676b9cf63cf" />



