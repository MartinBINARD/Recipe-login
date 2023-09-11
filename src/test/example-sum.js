// const sum = 42; // FAIL
// function sum(a = 0, b = 0) {
//   return a + b;
// }

function sum(...numbers) {
  return numbers.reduce((previous, current) => previous + current, 0);

  // tableau [1, 2, 3, 100]

  // 1er tour de boucle
  //   previous = initialValue = 0
  //   current = 1
  // → 0 + 1 = 1

  // 2ème tour de boucle
  //   previous = 1
  //   current = 2
  // → 1 + 2 = 3

  // 3ème tour de boucle
  //   previous = 3
  //   current = 3
  // → 3 + 3 = 6

  // dernier tour de boucle
  //   previous = 6
  //   current = 100
  // → 6 + 100 = 106
}

export default sum;
