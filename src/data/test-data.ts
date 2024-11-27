import { faker } from "@faker-js/faker";

const sports = [
  "Soccer",
  "Hockey",
  "Cricket",
  "Badminton",
  "Basketball",
  "Swimming",
  "Tennis",
  "Volleyball",
];

const generatePhoneNumber = () => {
  return "9" + faker.string.numeric(9);
};

export const testData = {
  loginData: {
    email: `testemail${faker.internet.email()}`,
  },
  signupData: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    mobileNumber: generatePhoneNumber(),
    password: `Trigent@${faker.number.int({ min: 1000, max: 9999 })}`,
  },
  addressData: {
    streetAddress: faker.location.streetAddress(),
    additionalAddress: faker.location.secondaryAddress(),
    state: "Alabama",
    city: faker.location.city(),
    zipCode: faker.location.zipCode("#####"),
    country: "United States of America",
  },
  activities: [
    {
      name: faker.helpers.arrayElement(sports),
      years: faker.number.int({ min: 1, max: 4 }).toString(),
      shortInput: faker.lorem.sentence(),
      longInput: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(),
    },
    {
      name: faker.helpers.arrayElement(sports),
      years: faker.number.int({ min: 1, max: 4 }).toString(),
      shortInput: faker.lorem.sentence(),
      longInput: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(),
    },
    {
      name: faker.helpers.arrayElement(sports),
      years: faker.number.int({ min: 1, max: 4 }).toString(),
      shortInput: faker.lorem.sentence(),
      longInput: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(),
    },
    {
      name: faker.helpers.arrayElement(sports),
      years: faker.number.int({ min: 1, max: 4 }).toString(),
      shortInput: faker.lorem.sentence(),
      longInput: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(),
    },
  ],
  highSchoolData: {
    name: `${faker.location.city()} High School`,
    streetAddress: faker.location.streetAddress(),
    additionalAddress: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode("#####"),
    gpa: faker.number.int({ min: 70, max: 100 }).toString(),
    graduationDate: faker.date.future().toLocaleDateString("en-US"),
    transcriptFileName: "My_School_Transcript.pdf",
  },
  essayData: {
    animalEssay: faker.lorem.paragraphs(3),
    schoolEssay: faker.lorem.paragraphs(3),
  },
};
