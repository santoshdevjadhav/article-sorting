import SetUpTests from "./setupTests";
import App from "./App";
import { shallow } from "enzyme";
import React from "react";

describe("List Test Case", () => {
  it("renders app component", () => {
    shallow(<App />);
  });
});
