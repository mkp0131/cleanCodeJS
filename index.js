const numbers = [1,2,3];

const numObj = {
  numbers: numbers.map((n, i) => i),
  say: (false) ? "Good" : "Bad",
  alert: alert(11);
}

console.log(numObj)