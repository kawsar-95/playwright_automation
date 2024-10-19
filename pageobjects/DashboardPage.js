class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

  }

  async searchProductAddCart(productName) {
    const titles = await this.productsText.allTextContents();
    console.log(titles);

    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      const productTitle = await this.products.nth(i).locator("b").textContent();
      console.log(`Checking product title: "${productTitle.trim()}" against "${productName.trim()}"`);

      if (productTitle.trim().toLowerCase() === productName.trim().toLowerCase()) {
        const addToCartButton = this.products.nth(i).locator("button:has-text('Add To Cart')");
        await addToCartButton.waitFor({ state: 'visible' });
        await addToCartButton.click();
        console.log(`Clicked 'Add To Cart' for ${productName}`);
        break;
      }
    }
  }


  async navigateToOrders() {
    await this.orders.click();
  }


  async navigateToCart() {
    await this.cart.click();
  }

}
module.exports = { DashboardPage };