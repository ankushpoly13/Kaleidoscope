import test, { expect } from "../fixtures/base-page";

test.describe("Kaleidoscope Applicant Application Process", () => {
  test.beforeEach(async ({ login }) => {
    await login.goto();
  });

  test("Complete application submission flow", async ({
    login,
    signUp,
    program,
  }) => {
    await test.step("Authenticate user", async () => {
      await login.login();
      await signUp.createAccount();
    });

    await test.step("Complete initial registration", async () => {
      await program.completeRegistration();
    });

    await test.step("Fill out activities section", async () => {
      await program.addActivity1();
      await program.clickNextpage();
      await program.validateErrorMessage();
      await program.addActivity2();
      await program.addActivity3();
      await program.addActivity4();
      await program.clickNextpage();
    });

    await test.step("Complete high school information", async () => {
      await program.fillHighSchoolInformation();
    });

    await test.step("Complete essay section", async () => {
      await program.validateEssay();
      await program.fillEssay();
      await program.clickNextpage();
    });

    await test.step("Review and submit application", async () => {
      await program.reviewApplicationAndVerifyEditing();
    });
  });
});
