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

- 명시적인 변수, 함수 명을 사용한다.
- 함수의 매개변수의 순서가 경계다.

### min, max

- 최소값과 최대값을 다룬다.
- 최소값부터 최대값 까지의 값을 사용.
- 최소값과 최대값 포함 여부를 결정
- 네이밍에 최소값과 최대값 포함 여부를 포함한다.

### begin, end

- 많은 사람들이 명시적으로 알아볼수있도록 begin, end 의 순서가 다르지 않게 사용

### first, last

- 순서를 이용할때 사용

### prefix, suffix

- 약속, 똑같은 유형의 변수라면 prefix, suffix 를 사용한다.
- 예) 제이쿼리: $, 리액트 폴더명: 폴더단위로 실행되는 것은 -s, 규칙성없이 단일로 실행되는 것은 단수로 작성.

## 분기 다루기

### 값(value), 식(eletron), 문(statement)

- 값이 들어가야하는 곳에 문이 들어갈 수 없다.
```js
const numObj = {
  numbers: numbers.map((n, i) => i), // for 문 불가
  say: (false) ? "Good" : "Bad", // if 문 불가
}
```

### 삼항 연산자

- 조건 ? 식 : 식
- 일관성이 있게 사용
- 사람을 위해 코드를 작성(알아보기 쉽도록!)
- 값을 리턴받을 때만 사용
- 
```js
// return 값이 없다.
function alertMsg(isAdult) {
  isAdult
    ? alert('입장이 가능합니다.')
    : alert('입장이 불가능합니다.')
}
// return 값이 없기 때문에 if 문을 사용하여 명시적으로 표현
function alertMsg(isAdult) {
  if (isAdult) {
    alert('입장이 가능합니다.')
  } else {
    alert('입장이 불가능합니다.')
  }
}
```

### truthy, falsy

- 조건에서 참이나 거짓중 한가지만 필요할때 사용
- ! 를 붙여 boolean 값으로 만들어서 사용

```js
function sayHello(name) {
  if(!name) {
    return "아무도 없네요.";
  }
  return "안녕하세요. " + name;
}
```

- falsy 한 값

```js
false
null
undefined
0
-0
0n
NaN
""
```

### 단축평가

- 값 && 값, 혹은 값 || 값 으로 표현하며 마지막으로 도달한 값을 사용

```js
true && true && 도달O
true && false && 도달X 

false || false || 도달O
false || true || 도달X
```

- 즉, 조건과 값이 같을때 사용한다.

```js
// if 문 사용시
function loadDate(date) {
  if(date) {
    return date;
  }
  else {
    return "Loading";
  }
}
// 단축평가 사용시
function loadDate(date) {
  return date || "Loading";
}
```

### Early Return

- 하나의 의존성이 많은 로직의 조건일때 그 조건의 걸어 함수를 미리 종료한다.
- if 문의 depth 를 줄일 수 있다.

```js
function login() {
  if(!state) return "종료";
  alert("안녕하세요.");
}
```

### 부정 조건문 지양

- 부정 조건문은 한번더 생각해야되기 때문에 복잡하다.
- 프로그램 언어 에서 if 문이 true 를 실행시킨다.

```js
// isNaN 에서 ! 을 붙여서 한번더 값을 반대로 돌린다.
if(!isNaN(3)) {
  console.log("숫자 입니다.");
}
// typeof 를 사용하여 생각하기 쉽게 사용
if(typeof 3) {
  console.log("숫자 입니다.");
}
```

### Default Case

- default 값 부여
- 함수를 사용했을시 매개변수를 사용하지 않았을때도 기본적인 실행이 되도록 고려한다.

```js
function getPosition(x, y) {
  x = x || 15; // x의 값이 없을때 사용
  y = y || 40; // y의 값이 없을때 사용
  return {x, y};
}
```

- 매개변수가 잘못들어왔을시의 에러를 고려한다.

```js
function sayDayHello(day) {
  switch (day) {
    case "월요일": // some code
    case "화요일": // some code
    case "수요일": // some code
    case "목요일": // some code
    case "금요일": // some code
    case "토요일": // some code
    case "일요일": // some code
    default: throw new Error("입력한 값이 유효하지 않습니다."); // 매개변수가 잘못들어왔을시
  }
}
sayDayHello("일월요일") // case 에 없는 값이 매개변수로 들어옴.
```

### 명시적인 연산자 사용

- 실행의 우선순위를 명시적으로 보여준다.
- 예측가능하고 디버깅하기 쉽다.

```js
number++;
++number;
// 명시적으로 표현
number = number + 1;

3 * 5 + 3
// 명시적으로 표현 (괄호를 사용하여 우선순위를 보여줌)
(3 * 5) + 3
```

### Nullish coalescing operator

- 0 이라는 숫자는 false 로 형변환 되기때문에 default 값이 실행될 수 있다.
- null 병합연산자를 사용: ??
- 값1 ?? 값2 (존재하는 변수라면 그 값이 반환, 그렇지 않으면 value2)
- (value1 !== null && value1 !== undefined) ? value1 : value2; 와 동등한 코드(삼항연산자)

```js
function getPosition(x, y) {
  x = x || 15; // x의 값이 없을때 사용
  y = y || 40; // y의 값이 없을때 사용
  return {x, y};
}
getPosition(0, 0) // {15, 40} // 기본값이 실행됨.

function getPosition(x, y) {
  x = x ?? 15; // x의 값이 null 이거나, undefined 일때 사용
  y = y ?? 40; // y의 값이 null 이거나, undefined 일때 사용
  return {x, y};
}
getPosition(0, 0) // {0, 0} // 기본값이 실행됨.
```

- truthy, falsy 와 혼합해서 사용할경우 ()를 꼭 사용 [문법오류]

```js
// 에러 - 문법오류
null || undefined ?? "foo"; // raises a SyntaxError
true || undefined ?? "foo"; // raises a SyntaxError

// 정상작동 - 괄호를 사용
(null || undefined ) ?? "foo"; // returns "foo"
```

### 드모르간의 법칙
```js
if (!(A || B)) {
  // 실패
}
// 드모르간 법칙
if (!A && !B) {
  // 실패
}
```
