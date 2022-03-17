function add(a) {
  return function (b) { // 내부함수가 외부함수의 스코프에 접근
    return a + b;
  }
}

add10 = add(10);
console.log(add10(66));

