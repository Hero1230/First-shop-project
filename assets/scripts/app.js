// Makes product
class Product {
	constructor(title, imageUrl, price, description) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.price = price;
		this.description = description;
	}
}

class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}

class Component {
	constructor(renderHookId) {
		this.hookId = renderHookId;
	}

	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag);
		if (cssClasses) {
			rootElement.className = cssClasses;
		}
		if (attributes && attributes.lenght > 0) {
			for (const attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}
		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	}
}

// Adding product to cart array, and rendering price.
class ShoppingCart extends Component {
	items = [];

	get totalAmount() {
		const sum = this.items.reduce(
			(prevValue, curItem) => prevValue + curItem.price,
			0
		);
		return sum;
	}
	constructor(renderHookId) {
		super(renderHookId);
	}

	addProduct(product) {
		this.items.push(product);
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
			2
		)}</h2>`;
		console.log(this.items);
	}

	render() {
		const cartEl = this.createRootElement("section", "cart");
		cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now</button>
        `;
		this.totalOutput = cartEl.querySelector("h2");
	}
}

//Returning rendered item, and adds item to cart
class ProductItem {
	constructor(product) {
		this.product = product;
	}

	addToCart() {
		App.addProductToCart(this.product);
	}

	render() {
		const prodEl = document.createElement("li");
		prodEl.className = "product-item";
		prodEl.innerHTML = `
        <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
        </div>
        </div>
        `;
		//Adding item to cart on click
		const addCartButton = prodEl.querySelector("button");
		addCartButton.addEventListener("click", this.addToCart.bind(this));
		return prodEl;
	}
}

// Array contains products, and rendering list of it
class ProductList {
	products = [
		new Product(
			"A Pillow",
			"http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRM_NMZdeNWNKHnKTf73aK8ysnXfbm8RzWHYhIbHzJeZVrm7XZHLucM09tQrgQdb2JO_guaTn6ZjFXXGD7T7Jk",
			19.99,
			"A soft pillow!"
		),
		new Product(
			"A Carpet",
			"https://static.turbosquid.com/Preview/2019/01/08__08_20_42/Carpetfreesignture.jpg90372B2C-418D-4252-8B64-911283D4C396Large.jpg",
			39.99,
			"A carpet which you might like - or not."
		),
	];

	constructor() {}

	render() {
		const prodList = document.createElement("ul");
		prodList.className = "product-list";
		for (const prod of this.products) {
			const productItem = new ProductItem(prod);
			const prodEl = productItem.render();
			prodList.append(prodEl);
		}
		return prodList;
	}
}

//Rendering all items on site
class Shop {
	cart;

	render() {
		const renderHook = document.getElementById("app");

		this.cart = new ShoppingCart("app");
		this.cart.render();
		const productList = new ProductList();
		const prodListEl = productList.render();

		renderHook.append(prodListEl);
	}
}

class App {
	static cart;

	static init() {
		const shop = new Shop();
		shop.render();
		this.cart = shop.cart;
	}

	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();

//Making shop and rendering shop
