import { Locator, Page } from "@playwright/test";
import { testData } from "../data/test-data";

interface SignUpPageLocators {
  firstName: Locator;
  lastName: Locator;
  mobileNumber: Locator;
  password: Locator;
  ageCheckbox: Locator;
  submit: Locator;
}

interface SignUpFormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  password: string;
}

export class SignUp {
  private readonly page: Page;
  private readonly locators: SignUpPageLocators;
  private static readonly DEFAULT_TIMEOUT = 60000;

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      firstName: page.getByLabel("First Name"),
      lastName: page.getByLabel("Last Name"),
      password: page.getByLabel("Create a Password"),
      mobileNumber: page.getByPlaceholder("1 (702) 123-4567"),
      ageCheckbox: page.getByLabel("I confirm that I am at least 13 years old"),
      submit: page.getByLabel("Submit"),
    };
  }

  /**
   * Fill out and submit the sign-up form
   */
  async createAccount(): Promise<void> {
    await this.waitForPageLoad();
    await this.fillSignUpForm(testData.signupData);
    await this.acceptTerms();
    await this.submitForm();
  }

  /**
   * Wait for the sign-up page to load
   */
  private async waitForPageLoad(): Promise<void> {
    await this.locators.lastName.waitFor({
      timeout: SignUp.DEFAULT_TIMEOUT,
      state: "visible",
    });
  }

  /**
   * Fill out the sign-up form with provided data
   */
  private async fillSignUpForm(data: SignUpFormData): Promise<void> {
    const { firstName, lastName, mobileNumber, password } = this.locators;

    await firstName.fill(data.firstName);
    await lastName.fill(data.lastName);
    await mobileNumber.fill(data.mobileNumber);
    await password.fill(data.password);
  }

  /**
   * Accept terms by checking the age confirmation checkbox
   */
  private async acceptTerms(): Promise<void> {
    await this.locators.ageCheckbox.check();
  }

  /**
   * Submit the sign-up form
   */
  private async submitForm(): Promise<void> {
    await this.locators.submit.click();
  }
}
