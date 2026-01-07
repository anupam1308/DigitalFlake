import { Router } from "express";

const router = Router();

let products = [
  {
    id: 123,
    name: "Motorola edge",
    categoryId: 1,              
    subcategoryId: 1,           
    imageUrl: "/images/products/motorola-edge.jpg",
    status: "Active",
  },
  {
    id: 124,
    name: "HP Pavillion",
    categoryId: 2,              
    subcategoryId: 2,           
    imageUrl: "/images/products/hp-pavillion.jpg",
    status: "Inactive",
  },
  {
    id: 125,
    name: "Apple",
    categoryId: 3,              
    subcategoryId: 3,           
    imageUrl: "/images/products/apple.jpg",
    status: "Inactive",
  },
];

router.get("/", (req, res) => {
  res.json(products);
});

router.post("/", (req, res) => {
  const { name, categoryId, subcategoryId, imageUrl, status } = req.body;
  const id = products.length ? products[products.length - 1].id + 1 : 1;

  const prod = {
    id,
    name,
    categoryId: Number(categoryId),
    subcategoryId: Number(subcategoryId),
    imageUrl: imageUrl || "",
    status: status || "Inactive",
  };

  products.push(prod);
  res.status(201).json(prod);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, categoryId, subcategoryId, imageUrl, status } = req.body;

  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) return res.status(404).json({ message: "Not found" });

  products[index] = {
    ...products[index],
    name: name ?? products[index].name,
    categoryId:
      categoryId !== undefined ? Number(categoryId) : products[index].categoryId,
    subcategoryId:
      subcategoryId !== undefined
        ? Number(subcategoryId)
        : products[index].subcategoryId,
    imageUrl: imageUrl ?? products[index].imageUrl,
    status: status ?? products[index].status,
  };

  res.json(products[index]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id !== Number(id));
  res.status(204).end();
});

export default router;
