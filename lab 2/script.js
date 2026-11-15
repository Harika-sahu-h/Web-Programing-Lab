const products = [
  {
    id: 1, name: "Redmi 12C Smartphone", brand: "Redmi", category: "Mobile Phone",
    price: 7499,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    description: "Smartphone with a large display, multi-camera setup, expandable storage and long-lasting battery. Sample listing for the lab exercise."
  },
  {
    id: 2, name: "Mi Smart Band", brand: "Xiaomi", category: "Smart Watch",
    price: 2299,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
    description: "Fitness band with activity tracking, heart-rate monitoring, sleep tracking and notifications. Sample listing for the lab exercise."
  },
  {
    id: 3, name: "Power Bank 20000mAh", brand: "Redmi", category: "Power Bank",
    price: 1499,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    description: "Portable high-capacity power bank for charging compatible mobile devices while travelling. Sample listing for the lab exercise."
  },
  {
    id: 4, name: "Wireless Earbuds", brand: "boAt", category: "Audio",
    price: 1299,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500",
    description: "Compact wireless earbuds with a charging case, hands-free calling and convenient everyday listening. Sample listing for the lab exercise."
  },
  {
    id: 5, name: "Bluetooth Headphones", brand: "JBL", category: "Audio",
    price: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Over-ear wireless headphones designed for comfortable listening, music playback and calls. Sample listing for the lab exercise."
  },
  {
    id: 6, name: "Portable Bluetooth Speaker", brand: "Sony", category: "Audio",
    price: 2499,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Compact portable speaker for music playback at home or outdoors. Sample listing for the lab exercise."
  }
];

const tableBody = document.getElementById("productTableBody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const resultCount = document.getElementById("resultCount");
const resetButton = document.getElementById("resetButton");
const dialog = document.getElementById("productDialog");
const dialogContent = document.getElementById("dialogContent");
const dialogClose = document.getElementById("dialogClose");

const formatPrice = amount => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(amount);

function createCategoryOptions() {
  [...new Set(products.map(product => product.category))].sort().forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function makeProductRow(product) {
  const row = document.createElement("tr");

  const imageCell = document.createElement("td");
  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  image.onerror = () => {
    image.src = "https://placehold.co/160x180/eaf0f7/334155?text=Product";
  };
  imageCell.appendChild(image);

  const nameCell = document.createElement("td");
  const name = document.createElement("div");
  name.className = "product-name";
  name.textContent = product.name;
  const category = document.createElement("span");
  category.className = "category-tag";
  category.textContent = product.category;
  nameCell.append(name, category);

  const brandCell = document.createElement("td");
  brandCell.className = "brand";
  brandCell.textContent = product.brand;

  const priceCell = document.createElement("td");
  priceCell.className = "price";
  priceCell.textContent = formatPrice(product.price);

  const descriptionCell = document.createElement("td");
  descriptionCell.className = "description";
  descriptionCell.textContent = product.description;

  const actionCell = document.createElement("td");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "details-button";
  button.textContent = "View details";
  button.addEventListener("click", () => showDetails(product));
  actionCell.appendChild(button);

  row.append(imageCell, nameCell, brandCell, priceCell, descriptionCell, actionCell);
  return row;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  let visible = products.filter(product => {
    const matchesQuery = [product.name, product.brand, product.category, product.description]
      .some(value => value.toLowerCase().includes(query));
    const matchesCategory = category === "all" || product.category === category;
    return matchesQuery && matchesCategory;
  });

  switch (sortSelect.value) {
    case "price-low": visible.sort((a, b) => a.price - b.price); break;
    case "price-high": visible.sort((a, b) => b.price - a.price); break;
    case "name": visible.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  tableBody.replaceChildren();
  if (visible.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.className = "empty-cell";
    cell.textContent = "No products match your search. Try another keyword or reset the filters.";
    row.appendChild(cell);
    tableBody.appendChild(row);
  } else {
    visible.forEach(product => tableBody.appendChild(makeProductRow(product)));
  }
  resultCount.textContent = `Showing ${visible.length} of ${products.length} products`;
}

function showDetails(product) {
  dialogContent.replaceChildren();
  const layout = document.createElement("div");
  layout.className = "dialog-product";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  image.onerror = () => image.src = "https://placehold.co/160x180/eaf0f7/334155?text=Product";

  const copy = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = product.name;
  const brand = document.createElement("p");
  brand.textContent = `Brand: ${product.brand}`;
  const category = document.createElement("p");
  category.textContent = `Category: ${product.category}`;
  const price = document.createElement("p");
  price.className = "dialog-price";
  price.textContent = formatPrice(product.price);
  const description = document.createElement("p");
  description.textContent = product.description;

  copy.append(title, brand, category, price, description);
  layout.append(image, copy);
  dialogContent.appendChild(layout);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else alert(`${product.name}\n${product.brand}\n${formatPrice(product.price)}\n${product.description}`);
}

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  sortSelect.value = "default";
  renderProducts();
});
dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

createCategoryOptions();
renderProducts();
