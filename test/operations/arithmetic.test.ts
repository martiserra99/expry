import { expry } from "../../src";

describe("$abs", () => {
  it("returns the absolute value of a number", () => {
    expect(expry({ $abs: 1 })).toBe(1);
    expect(expry({ $abs: -1 })).toBe(1);
  });
});

describe("$add", () => {
  it("adds numbers together", () => {
    expect(expry({ $add: [1, 2, 3] })).toBe(6);
    expect(expry({ $add: [-2, 4] })).toBe(2);
  });
});

describe("$ceil", () => {
  it("returns the smallest integer greater than or equal to the specified number", () => {
    expect(expry({ $ceil: 1 })).toBe(1);
    expect(expry({ $ceil: 7.8 })).toBe(8);
    expect(expry({ $ceil: -2.8 })).toBe(-2);
  });
});

describe("$divide", () => {
  it("divides one number by another", () => {
    expect(expry({ $divide: [4, 2] })).toBe(2);
    expect(expry({ $divide: [5, 2] })).toBe(2.5);
  });
});

describe("$exp", () => {
  it("raises Euler's number to the specified exponent", () => {
    expect(expry({ $exp: 0 })).toBe(1);
    expect(expry({ $exp: 2 })).toBe(7.38905609893065);
    expect(expry({ $exp: -2 })).toBe(0.1353352832366127);
  });
});

describe("$floor", () => {
  it("returns the largest integer less than or equal to the specified number", () => {
    expect(expry({ $floor: 1 })).toBe(1);
    expect(expry({ $floor: 7.8 })).toBe(7);
    expect(expry({ $floor: -2.8 })).toBe(-3);
  });
});

describe("$ln", () => {
  it("calculates the natural logarithm of a number", () => {
    expect(expry({ $ln: 1 })).toBe(0);
    expect(expry({ $ln: 10 })).toBe(2.302585092994046);
  });
});

describe("$log", () => {
  it("calculates the log of a number in the specified base", () => {
    expect(expry({ $log: [100, 10] })).toBe(2);
  });
});

describe("$log10", () => {
  it("calculates the log base 10 of a number", () => {
    expect(expry({ $log10: 1 })).toBe(0);
    expect(expry({ $log10: 10 })).toBe(1);
    expect(expry({ $log10: 100 })).toBe(2);
  });
});

describe("$mod", () => {
  it("divides one number by another and returns the remainder", () => {
    expect(expry({ $mod: [5, 2] })).toBe(1);
  });
});

describe("$multiply", () => {
  it("multiplies numbers together", () => {
    expect(expry({ $multiply: [2, 3] })).toBe(6);
    expect(expry({ $multiply: [2, 2, 3] })).toBe(12);
  });
});

describe("$pow", () => {
  it("raises a number to the specified exponent", () => {
    expect(expry({ $pow: [5, 0] })).toBe(1);
    expect(expry({ $pow: [5, 2] })).toBe(25);
    expect(expry({ $pow: [5, -2] })).toBe(0.04);
  });
});

describe("$round", () => {
  it("rounds a number to a specified decimal place", () => {
    expect(expry({ $round: [5.43, 0] })).toBe(5);
    expect(expry({ $round: [5.43, 1] })).toBe(5.4);
  });
});

describe("$sqrt", () => {
  it("calculates the square root of a positive number", () => {
    expect(expry({ $sqrt: 25 })).toBe(5);
    expect(expry({ $sqrt: 30 })).toBe(5.477225575051661);
  });
});

describe("$subtract", () => {
  it("subtracts two numbers to return the difference", () => {
    expect(expry({ $subtract: [5, 2] })).toBe(3);
    expect(expry({ $subtract: [-2, 4] })).toBe(-6);
  });
});

describe("$trunc", () => {
  it("truncates a number to a specified decimal place", () => {
    expect(expry({ $trunc: [5.43, 0] })).toBe(5);
    expect(expry({ $trunc: [5.43, 1] })).toBe(5.4);
  });
});
