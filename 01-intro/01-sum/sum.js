function isNumber(prop) {
  return typeof prop === "number" && !isNaN(prop);
}

export default function sum(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError("Oops! Check type of incoming props");
  }

  return a + b;
}
