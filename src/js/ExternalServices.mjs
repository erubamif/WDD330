async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  }

  const errorText = await res.text();
  console.error("Server response:", res.status, errorText);

  throw new Error(`HTTP ${res.status}: ${errorText}`);
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const url = "https://wdd330-backend.onrender.com/checkout";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    return fetch(url, options).then(convertToJson);
  }

  async registerUser(user) {
    const url = "https://wdd330-backend.onrender.com/users";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    return fetch(url, options).then(convertToJson);
  }
}