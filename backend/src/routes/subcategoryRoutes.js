import { Router } from "express";

const router = Router();

let subcategories = [
  {
    id: 1,
    name: "Smartphones",
    categoryId: 1,
    imageUrl: "/images/subcategories/smartphones.jpg",
    status: "Active",
  },
  {
    id: 2,
    name: "Gaming Laptops",
    categoryId: 2,
    imageUrl: "/images/subcategories/gaming-laptops.jpg",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Vegetables",
    categoryId: 3,
    imageUrl: "/images/subcategories/vegetables.jpg",
    status: "Active",
  },
];

router.get("/", (req, res) => {
  res.json(subcategories);
});

router.post("/", (req, res) => {
  const { name, categoryId, imageUrl, status } = req.body;
  const id = subcategories.length
    ? subcategories[subcategories.length - 1].id + 1
    : 1;

  const newSub = {
    id,
    name,
    categoryId: Number(categoryId),
    imageUrl: imageUrl || "",
    status: status || "Inactive",
  };

  subcategories.push(newSub);
  res.status(201).json(newSub);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, categoryId, imageUrl, status } = req.body;

  const index = subcategories.findIndex((s) => s.id === Number(id));
  if (index === -1) return res.status(404).json({ message: "Not found" });

  subcategories[index] = {
    ...subcategories[index],
    name: name ?? subcategories[index].name,
    categoryId:
      categoryId !== undefined
        ? Number(categoryId)
        : subcategories[index].categoryId,
    imageUrl: imageUrl ?? subcategories[index].imageUrl,
    status: status ?? subcategories[index].status,
  };

  res.json(subcategories[index]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  subcategories = subcategories.filter((s) => s.id !== Number(id));
  res.status(204).end();
});

export default router;
