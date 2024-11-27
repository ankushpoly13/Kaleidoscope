import { Locator, Page } from "@playwright/test";
import { testData } from "../data/test-data";

interface LoginPageLocators {
  login: Locator;
  emailAddress: Locator;
  next: Locator;
}

export class Login {
  private readonly page: Page;
  private readonly locators: LoginPageLocators;
  private static readonly DEFAULT_TIMEOUT = 60000;
  private static readonly BASE_URL = "/program/sdet-test-scholarship";

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      login: page.getByText("Login"),
      emailAddress: page.getByPlaceholder("Email Address"),
      next: page.getByLabel("Next"),
    };
  }

  async goto(): Promise<void> {
    await this.page.goto(Login.BASE_URL);
    await this.locators.login.waitFor({ timeout: Login.DEFAULT_TIMEOUT });
  }

  async login(): Promise<void> {
    await this.locators.login.click();
    await this.locators.emailAddress.fill(testData.loginData.email);
    await this.locators.next.click();
  }
}
