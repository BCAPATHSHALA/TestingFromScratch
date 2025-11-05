import { describe, expect, it, test } from "@jest/globals";
import { sum } from "./index";

/*
1. describe: This function is used to group related tests together. It takes a string (the name of the test suite) and a callback function that contains the individual tests.

2. test: This function defines an individual test case. It also takes a string (the name of the test) and a callback function that contains the actual test code.

2.1. it: This is an alias for the test function and works the same way. It is often used for better readability.

3. expect: This function is used to create assertions. It takes a value and returns an object with various matcher methods (like toBe) that you can use to assert conditions about the value.
*/

describe("sum function", () => {
  it("adds two positive numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("adds two negative numbers", () => {
    expect(sum(-2, -3)).toBe(-5);
  });
});

/*Explanation of the code:

1. Importing Testing Functions: The code begins by importing the describe, expect, and test functions from the @jest/globals package. These functions are essential for writing tests in Jest.

2. Define Test Suite: The describe function is used to define a test suite. It takes a string (the name of the test suite) and a callback function that contains the tests. In this case, the test suite is named "sum function".

3. Individual Test Cases: Inside the describe block, there are two test cases defined using the test function. Each test case also takes a string (the name of the test) and a callback function that contains the actual test code.

4. Assertions: Within each test case, the expect function is used to create assertions. It checks whether the result of the sum function matches the expected value using the toBe matcher. For example, expect(sum(2, 3)).toBe(5) checks if the sum of 2 and 3 equals 5.

5. Running the Tests: To run the tests, you can use the jest command in the terminal. For example, jest --coverage will run the tests and generate coverage reports.*/
