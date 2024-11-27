import { expect, Locator, Page } from "@playwright/test";
import path from "path";
import { testData } from "../data/test-data";

interface ReviewSection {
  personalInfo: {
    [key: string]: Locator;
  };
  activities: {
    activities: Locator;
  };
  highSchool: {
    [key: string]: Locator;
  };
  essays: {
    [key: string]: Locator;
  };
}

export class Program {
  private readonly page: Page;
  private readonly locators: {
    form: {
      [key: string]: Locator;
    };
    buttons: {
      [key: string]: Locator;
    };
    essays: {
      [key: string]: Locator;
    };
    editLinks: {
      [key: string]: Locator;
    };
  };
  private readonly reviewSection: ReviewSection;

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      form: {
        streetAddress: page.getByPlaceholder("Enter your street address"),
        additionalStreetAddress: page.locator('input[name="contact.address1"]'),
        state: page.getByPlaceholder("Enter your state"),
        selectState: page.getByText(testData.addressData.state),
        city: page.getByPlaceholder("Enter your city"),
        zipCode: page.getByPlaceholder("Enter your zip code"),
        country: page.getByPlaceholder("Enter your country"),
        selectCountry: page.getByText("United States of America"),
        activityName: page.getByPlaceholder("Short Input"),
        numberOfYears: page.getByPlaceholder("123"),
        shortInput: page.getByLabel("List any leadership roles,"),
        longInput: page.getByLabel("Description of Involvement *"),
        descriptionOfInvolvement: page.getByLabel(
          "Description of Involvement *"
        ),
        highSchoolName: page.getByPlaceholder(
          "Please enter the name of your current High School"
        ),
        highSchoolStreetAddress: page.getByPlaceholder(
          "Enter high school street address"
        ),
        additionalHighSchoolStreetAddress: page.locator(
          'input[name="contact.highSchoolAddress1"]'
        ),
        highSchoolCity: page.getByPlaceholder("Enter high school city"),
        highSchoolState: page.getByPlaceholder("Enter high school state"),
        highSchoolZipCode: page.locator(".mantine-NumberInput-input").first(),
        gpa: page.getByPlaceholder("Enter your current GPA"),
        yearOfHighSchoolGraduation: page.getByPlaceholder("Enter a date"),
      },
      buttons: {
        nextPage: page.getByText("Next Page"),
        addEntry: page.getByRole("button", { name: "Add Entry" }),
        add: page.getByRole("button", { name: "Add" }),
        submit: page.getByText("Submit"),
        submitOnReview: page.getByRole("button", { name: "Submit" }),
      },
      essays: {
        carCheckbox: page.locator('input[value="Cars"]'),
        animalCheckbox: page.locator('input[value="Animals"]'),
        schoolCheckbox: page.locator('input[value="School"]'),
        otherCheckbox: page.locator('input[value="Other"]'),
        essayAboutCars: page.getByLabel("Essay about Cars"),
        essayAboutAnimals: page.getByLabel("Essay about Animals"),
        essayAboutSchool: page.getByLabel("Essay about School"),
        essayAboutOther: page.getByLabel("Provide an essay about any topic"),
        writeEssayTextArea: page.getByPlaceholder("Long Input"),
      },
      editLinks: {
        one: page
          .getByRole("button", { name: "1.Lets get to know you! Edit" })
          .getByRole("link"),
        two: page
          .getByRole("button", { name: "2.Extracurricular Activities Edit" })
          .getByRole("link"),
        three: page
          .getByRole("button", { name: "3.High School Information Edit" })
          .getByRole("link"),
        four: page
          .getByRole("button", { name: "4.Essay Edit" })
          .getByRole("link"),
      },
    };

    this.reviewSection = this.initializeReviewSection();
  }

  private initializeReviewSection(): ReviewSection {
    const createLocator = (label: string) =>
      this.page.locator(`//p[.='${label}']//following-sibling::p`);

    return {
      personalInfo: {
        firstName: createLocator("First Name"),
        lastName: createLocator("Last Name"),
        email: createLocator("Email Address"),
        streetAddress: createLocator("Street Address"),
        additionalAddress: createLocator("Additional Street Address"),
        state: createLocator("State (Full)"),
        city: createLocator("City"),
        zipCode: createLocator("Zip Code"),
        country: createLocator("Country"),
      },
      activities: {
        activities: this.page.locator('[data-test="activity-item"]'),
      },
      highSchool: {
        name: createLocator("High School Name"),
        streetAddress: createLocator("High School Street Address"),
        additionalAddress: createLocator(
          "Additional High School Street Address"
        ),
        city: createLocator("High School City"),
        state: createLocator("High School State (Full)"),
        zipCode: createLocator("High School Zip Code"),
        gpa: createLocator("GPA"),
        graduationDate: createLocator("Year of High School Graduation"),
      },
      essays: {
        animalEssay: createLocator("Essay about Animals"),
        schoolEssay: createLocator("Essay about School"),
      },
    };
  }

  async completeRegistration(): Promise<void> {
    const { form, buttons } = this.locators;

    await form.streetAddress.waitFor({ timeout: 60000 });
    await form.streetAddress.fill(testData.addressData.streetAddress);
    await form.additionalStreetAddress.fill(
      testData.addressData.additionalAddress
    );
    await form.state.fill(testData.addressData.state);
    await form.selectState.click();
    await form.city.fill(testData.addressData.city);
    await form.zipCode.fill(testData.addressData.zipCode);
    await form.country.click();
    await form.country.fill(testData.addressData.country);
    await form.selectCountry.click();
    await buttons.nextPage.click();
    await buttons.addEntry.waitFor({ timeout: 60000 });
  }

  private async addActivity(
    activityData: (typeof testData.activities)[0]
  ): Promise<void> {
    const { form, buttons } = this.locators;

    await buttons.addEntry.click();
    await form.activityName.fill(activityData.name);
    await form.numberOfYears.fill(activityData.years);
    await form.shortInput.fill(activityData.shortInput);
    await form.longInput.fill(activityData.longInput);
    await form.descriptionOfInvolvement.fill(activityData.description);
    await buttons.add.click();
  }

  async addActivity1(): Promise<void> {
    await this.addActivity(testData.activities[0]);
  }

  async addActivity2(): Promise<void> {
    await this.addActivity(testData.activities[1]);
  }

  async addActivity3(): Promise<void> {
    await this.addActivity(testData.activities[2]);
  }

  async addActivity4(): Promise<void> {
    await this.addActivity(testData.activities[3]);
    await this.page.waitForTimeout(5000);
  }

  async clickNextpage(): Promise<void> {
    await this.locators.buttons.nextPage.click();
  }

  async validateErrorMessage(): Promise<void> {
    const errorMessage = this.page.getByText("Please add at least 2 entries");
    await errorMessage.waitFor({ timeout: 60000 });
    await expect(errorMessage).toBeVisible();
  }

  async fillHighSchoolInformation(): Promise<void> {
    const { form, buttons } = this.locators;

    await form.highSchoolName.waitFor({ timeout: 60000 });
    await form.highSchoolName.fill(testData.highSchoolData.name);
    await form.highSchoolStreetAddress.fill(
      testData.highSchoolData.streetAddress
    );
    await form.additionalHighSchoolStreetAddress.fill(
      testData.highSchoolData.additionalAddress
    );
    await form.highSchoolCity.fill(testData.highSchoolData.city);
    await form.highSchoolState.fill(testData.addressData.state);
    await form.selectState.click();
    await form.highSchoolZipCode.fill(testData.highSchoolData.zipCode);
    await form.gpa.fill(testData.highSchoolData.gpa);
    await form.yearOfHighSchoolGraduation.fill(
      testData.highSchoolData.graduationDate
    );
    await this.uploadFile();
    await buttons.nextPage.click();
  }

  private async uploadFile(): Promise<void> {
    const rootDir = path.resolve(__dirname, "../../");
    const filePath = path.join(
      rootDir,
      "src",
      "data",
      testData.highSchoolData.transcriptFileName
    );
    const fileInput = await this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(5000);
  }

  async validateEssay(): Promise<void> {
    const { essays } = this.locators;
    const checkboxes = [
      { checkbox: essays.carCheckbox, essay: essays.essayAboutCars },
      { checkbox: essays.animalCheckbox, essay: essays.essayAboutAnimals },
      { checkbox: essays.schoolCheckbox, essay: essays.essayAboutSchool },
      { checkbox: essays.otherCheckbox, essay: essays.essayAboutOther },
    ];

    for (const { checkbox, essay } of checkboxes) {
      await checkbox.waitFor({ timeout: 60000 });
      await checkbox.click();
      await essay.waitFor();
      await expect(essay).toBeVisible();
      await checkbox.click();
      await essay.waitFor({ state: "hidden" });
    }
  }

  async fillEssay(): Promise<void> {
    const { essays, buttons } = this.locators;

    await essays.animalCheckbox.click();
    await essays.essayAboutAnimals.waitFor();
    await essays.essayAboutAnimals.fill(testData.essayData.animalEssay);
    await essays.schoolCheckbox.click();
    await essays.essayAboutSchool.waitFor();
    await essays.essayAboutSchool.fill(testData.essayData.schoolEssay);
    await buttons.submit.waitFor();
  }

  async reviewApplicationAndVerifyEditing(): Promise<void> {
    await this.validateReviewPage();
    const url = await this.page.url();
    await this.locators.buttons.submitOnReview.click();
    await this.page.getByRole("heading", { name: "Welcome back" }).waitFor();
    await this.page.goto(url);

    const { editLinks } = this.locators;
    for (const link of Object.values(editLinks)) {
      await expect(link).not.toBeVisible();
    }
  }

  private async validateReviewPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Application" }).click();

    await this.page
      .getByRole("button", { name: "1.Lets get to know you! Edit" })
      .click();
    await this.validatePersonalInfo();

    await this.page
      .getByRole("button", { name: "2.Extracurricular Activities Edit" })
      .click();
    await this.validateActivities();

    await this.page
      .getByRole("button", { name: "3.High School Information Edit" })
      .click();
    await this.validateHighSchoolInfo();

    await this.page.getByRole("button", { name: "4.Essay Edit" }).click();
    await this.validateEssays();
  }

  private async validatePersonalInfo(): Promise<void> {
    const { personalInfo } = this.reviewSection;
    const expectedData = {
      firstName: testData.signupData.firstName,
      lastName: testData.signupData.lastName,
      email: testData.loginData.email.toLowerCase(),
      streetAddress: testData.addressData.streetAddress,
      additionalAddress: testData.addressData.additionalAddress,
      state: testData.addressData.state,
      city: testData.addressData.city,
      zipCode: testData.addressData.zipCode,
      country: "United States of America",
    };

    for (const [key, value] of Object.entries(expectedData)) {
      await expect(personalInfo[key]).toContainText(value);
    }
  }

  private async validateActivities(): Promise<void> {
    for (let i = 0; i < testData.activities.length; i++) {
      const activityElement = await this.page.locator(
        `[title="Entry ${i + 1}"]`
      );
      await expect(activityElement).toContainText(testData.activities[i].name);
    }
  }

  private async validateHighSchoolInfo(): Promise<void> {
    const { highSchool } = this.reviewSection;
    const expectedData = {
      name: testData.highSchoolData.name,
      streetAddress: testData.highSchoolData.streetAddress,
      additionalAddress: testData.highSchoolData.additionalAddress,
      city: testData.highSchoolData.city,
      state: testData.addressData.state,
      zipCode: testData.highSchoolData.zipCode,
      gpa: testData.highSchoolData.gpa,
      graduationDate: testData.highSchoolData.graduationDate,
    };

    for (const [key, value] of Object.entries(expectedData)) {
      await expect(highSchool[key]).toContainText(value);
    }
  }

  private async validateEssays(): Promise<void> {
    const { essays } = this.reviewSection;
    await expect(essays.animalEssay).toContainText(
      testData.essayData.animalEssay
    );
    await expect(essays.schoolEssay).toContainText(
      testData.essayData.schoolEssay
    );
  }
}
