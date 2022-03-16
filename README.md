# 클린코드 자바스크립트 - Udemy

## 변수 다루기

### 1. var 를 지양하자!

- var 의 단점: 초기 재할당이 언제나 가능하고, 블럭단위의 스코프를 가지지 않는다.

```js
var person = {
  name: "kan"
}
// var 키워드를 사용해도 재할당이 가능하다
var person = {
  name: "mkp"
}
```

### 2. 전역변수 사용 최소화

- 전역변수: window(브라우져), global(node) [크게 다른건 없다.]
- var 로 전역변수를 실행할 경우 window 객체에 할당된다. (기존의 api 가 오염이 될 수 있기 때문에 사용 지양!)

### 3. 임시변수 사용 최소화

- 함수내에 결과값이 return 하기 위해서 임시변수 사용시 함수가 실행되는동안 임시변수가 오염될 수 있으므로, 직관적으로 결과값을 return 한다.
- 디버깅이 힘들다
- 해결책: 함수 나누기, 바로반환, 고차함수(map, filter, reduce)

```js
function add(a, b) {
  const result = a + b; // 임시변수
  // 함수가 실행되는 중간에 result 변수가 오염될 수 있다.
  return result;
}

function add(a, b) {
  return a + b; // 임시변수 없이 바로 return
}
```

### 호이스팅 최소화

- 호이스팅: 런타임시 선언이 최상단으로 올라감
- 호이스팅으로 인해 예상치 못한 순서로 작동이 일어난다.
- function 으로 함수 선언, var 로 변수 선언시 호이스팅 발생

```js
var person = "mkp";

function getPerson() {
  console.log(person); // 결과: undefined
  var person; // 뒤늦게 선언되었음에도 호이스팅으로 인해 함수의 최상단으로 올라간다.
}

getPerson()
```

## 타입다루기

### typeof 를 맹신하면 안된다

- typeof 문제점: null 을 "object" 로 구분, class 를 "function" 로 구분 등등

```js
typeof '문자'; // 'string'
typeof true // 'boolean'
typeof undefined // 'undefined'
typeof 123 // 'number'
typeof Symbol() // 'symbol'
typeof function(){} // 'function'
typeof class {} // 'function'
typeof new String('Hello') // 'object'
typeof new Number(123) // 'object'
typeof null // 'object'
```

### instanceof 도 맹신할 수 없다.

- 최상단이 Object 이기 때문에, Object 검사시 모두 true 를 반환한다.

```js
const arr = [];
arr instanceof Array // true
arr instanceof Object // true
```

### Object.prototype.toString.call(변수) 를 사용하여 타입을 구분 할 수 있다. but, 무적은 아님

```js
Object.prototype.toString.call(arr); // '[object Array]'
Object.prototype.toString.call(new Date()); // '[object Date]'
```

### null, undefined

- null: 비어있는 값을 명시적으로 표현, 숫자적으로 0 으로 계산

```js
!null // true
!!null // false
null + 123 // 결과값: 123
```

- undefined: 선언은 했지만, 값은 정의되지 않고 할당 X, 숫자 계산 X

```js
!undefined // true
!!undefined // false
undefined + 123 // 결과값: NaN
```

### ==(eqeq) 사용을 지양한다. ===(eqeqeq) 사용권장!

- '0' 이라고 선언되어있는 스트링타입의 숫자를 비교하더라도, 형변환하여 === 를 사용하여 비교한다.

```js
const rank = '0';
console.log(rank === 0); // false
console.log(Number(rank) === 0); // true
```

### 명시적인 형변환 사용

- JS 가 자동으로 하는 형변환을 지양한다.

```js
11 + '문자열' // 암묵적인 형변환
String(11 + '문자열') // 명시적인 형변환
```

### isNaN 보다 Number.isNaN 을 사용 (헷갈리니 typeof 를 사용)

- is not a number: 값이 NaN 인지 판별. (숫자인지 아닌지 판별 하는 것과는 조금 다르다.)
- 결과값이 false 일 때 숫자, 결과가 반대로 나오기때문에 아주 헷갈린다.
- isNaN(): 인자로 들어온 값이 NaN 이거나, 값을 숫자로 변환했을 때 NaN이면 참(true)을 리턴 [느슨한 검사]
- Number.isNaN(): 인자로 들어온 값이 NaN 이어야만 참(true)을 리턴한다. [엄격한 검사]

```js
isNaN(123) // false / NaN 이 아니다. / 숫자가 맞다.
isNaN('abc') // true / NaN 이 맞다.(숫자로 형변환) / 숫자가 아니다.
Number.isNaN('abc') // false / NaN 이 아니다. / 숫자가 아니다.
```

## 경계 다루기