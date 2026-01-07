
import { Router } from "express";

const router = Router();


let categories = [
  {
    id: 1,
    name: "Mobile",
    imageUrl: "/images/categories/mobiles.jpg",
    status: "Active",
  },
  {
    id: 2,
    name: "Laptop",
    imageUrl: "/images/categories/laptops.jpg",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Grocery",
    imageUrl: "/images/categories/grocery.jpg",
    status: "Inactive",
  },
];


router.get("/", (req, res) => {
  res.json(categories);
});

router.post("/", (req, res) => {
  const { name, imageUrl, status } = req.body;

  const id = categories.length
    ? categories[categories.length - 1].id + 1
    : 1;

  const newCat = {
    id,
    name,
    imageUrl: imageUrl || "",
    status: status || "Inactive",
  };

  categories.push(newCat);
  res.status(201).json(newCat);
});


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, status } = req.body;

  const index = categories.findIndex((c) => c.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  categories[index] = {
    ...categories[index],
    name: name ?? categories[index].name,
    imageUrl: imageUrl ?? categories[index].imageUrl,
    status: status ?? categories[index].status,
  };

  res.json(categories[index]);
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  categories = categories.filter((c) => c.id !== Number(id));
  res.status(204).end();
});

export default router;
