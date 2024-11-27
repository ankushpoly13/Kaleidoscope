import { test as baseTest } from "@playwright/test";
import { Login } from "../pages/Login_page";
import { SignUp } from "../pages/Signup_page";
import { Program } from "../pages/Program_page";

const test = baseTest.extend<{
  login: Login;
  signUp: SignUp;
  program: Program;
}>({
  login: async ({ page }, use) => {
    await use(new Login(page));
  },
  signUp: async ({ page }, use) => {
    await use(new SignUp(page));
  },
  program: async ({ page }, use) => {
    await use(new Program(page));
  },
});

export default test;
export const expect = test.expect;
