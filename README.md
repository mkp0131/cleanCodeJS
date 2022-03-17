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

### 값(value), 식(expression), 문(statement)

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

## 배열 Array

### 배열은 객체이다.

- 배열도 key를 통하여 값을 부여할 수 있다. 많은 주의가 필요!

```js
const arr1 = [1,2,3]
arr1['mkp'] = 'Hello'
console.log(arr1.mkp) // 결과값: 'Hello'
```

- Array.isArray(arr1) // 객체인지 아닌지 확인

```js
typeof arr1 // "object" 값을 리턴
Array.isArray(arr1) // true 리턴
```

### array.length

- 배열의 length 조작하면 값이 삭제되거나 배열에 빈공간이 생긴다. 많은 주의 필요!

```js
const arr1 = [1,2,3]
arr1.length = 5;
console.log(arr1); // [1, 2, 3, , ] / 빈공백이 생긴다.

arr1.length = 0;
console.log(arr1); // [] / 배열의 값이 없어진다.
```

### 구조분해 할당

- 구조 분해할당으로 배열의 index 로 접근하는 값들을 줄인다.
- 배열도 객체이기 때문에, 배열의 순서를 건너 뛰어서도 변수 선언이 가능하다.

```js
const arr = [
  'mkp',
  'kan',
  'ldk',
]

const [mkp, , ldk] = arr; // 배열의 기본 구조분해 할당
const { 0: mkp, 2: ldk } = arr; // obj의 구조분해 할당을 이용해서 배열의 값을 추출
```

### 유사 배열 객체(array-like object)

- Array.from(arr-like-object): 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운Array 객체생성
- 유사배열 객체는 array 의 메소드 사용불가! -> Array.from 으로 복제해서 사용.

```js
const arrLikeObj = {
  0: 'kan',
  1: 'mkp',
  length: 2
}

console.log(Array.from(arrLikeObj))
```

### 불변성

- 배열을 복사할시 새로운 배열을 반환하여 사용한다. [deep copy]

### 고차함수

- 고차함수(array 메소드)를 사용하여 임시변수를 사용하지않고 깔끔하게 사용
- 메소드를 체이닝으로 연결해서 사용해서 명시적으로 사용.

### map 과 foreach 의 차이

- foreach: 리턴값 X, map: 리턴값 O
- 고차함수에서 continue, breack (조기종료)을 사용안된다. -> forin, forof 문을 사용한다. || every(), some(), find() 등을 사용해서 흐름을 제어한다.

## 객체 object

### Shorthand Properties & Concise Method

```js
// 예제1) Shorthand Properties
return {
  name,
  age
}

// 예제2) Concise Method: 함수를 obj 넣을때 '키:' 으로 값을 부여하지 않고 '함수명()' 으로 선언
const person = {
  say() {
    console.log("Hello")
  }
}
```

### Computed Property Name

- obj 에 key 에 동적값(식: expression || 값)을 할당 할 수있다.

```js
const obj = {
  ['say' + 'Hello']: "hello" // 키값을 식으로 표현 할 수 있다.
}

console.log(obj)
```

### Object Destructuring 객체 구조분해할당

- 함수의 매개변수가 3개 이상일 경우에는 구조분해 할당을 사용하는 것이좋다. (명시적)

```js
function person(name, age, phone) {
  
}
person('mkp', 34, '000000000');

// 구조분해 할당 명시적인 표현
function person({name, age, phone}) {

}
person({name: 'mkp', age: 34, phone: '000000000'});
```

- 중요한 인자는 순서를 첫번째로 하여 필수적이라는 것을 명시적으로 표현

```js
// 구조분해 할당 명시적인 표현
function person(name, {age, phone}) {

}
person('mkp', {age: 34, phone: '000000000'});
```

### Object.freeze 객체동결

- 중간에 object 의 프로퍼티를 변경 OR 추가 하더라도 object 가 변하지 않는다.
- depth 가 한단계 더 진행될 경우 (obj 안의 obj) 보호되지 않는다. 

```js
const obj = Object.freeze({
  name: 'mkp',
  age: 34
})

obj.name = 'kan';

console.log(obj); // { name: 'mkp', age: 34 } / 값이 변하지 X
```

### prototype 조작 지양

- JS 몽키패치 언어 이기때문에 기존의 동작을 보장하지 않아 아주 위험하다.

### hasOwnProperty 사용시 call() 이용

- object 의 prototype 에 있는 프로퍼티 명을 보호하지 않기때문에 call() 을 사용

```js
var foo = {
  hasOwnProperty: function() {
    return false;
  },
  bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // always returns false

// Use another Object's hasOwnProperty and call it with 'this' set to foo
({}).hasOwnProperty.call(foo, 'bar'); // true

// It's also possible to use the hasOwnProperty property from the Object prototype for this purpose
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```

### 프로퍼티 직접 접근 지양

- 타겟 오브젝트가 변경 혹은 프로퍼티 접근시 기능 추가(로그남기기.. 등등) 등등 의 이유로 프로퍼티 직접 접근을 지양.

```js
const person = {
  name: 'mkp',
}

person.name // 바로 접근

// 함수로 접근
function getName(obj) {
  // ... 추가기능
  return obj.name;
}
```

## 함수

### 함수의 종류

- 함수, 메서드, 생성자

### argument & parameter

- argument: 함수안에서 실행(호출) 할 때 사용하는 값
- parameter: 함수를 정의할때 argument 를 사용할때 담는 임시 값

### default parameter

- 기본값을 함수(식)로도 부여할 수 있다.

```js
function f({name = 'mkp', age = 30 + 4} = {}) {
  console.log(name, age)
}

f();
```

### Rest parameter

- 레스트 파라미터로 파라미터를 받을 경우, Array.from() 같은 메소드를 사용하지 않고 array 메소드를 바로 사용 할 수 있다.

```js
function f(...arg) {
  arg.map(
    v => console.log(v)
  )
}

f(1,2,3,4);
```

### void & return

- void: 함수에 반환이 존재하지 않는다. 
- 따라서 return 을 사용할 필요가 전혀 없다.
- 무의미한 return 은 코드를 더욱 복잡하게 만든다.

```js
function alertMsg() {
  return alert('경고');
}
```

### 자바스크립트 스코프

- 전역 스코프 (Global scope)
- 지역 스코프 (Local scope or Function-level scope)
- 렉시컬 스코프 (Lexical scope)

### 화살표 함수

- 화살표함수의 this 는 Lexical scope (렉시컬 스코프) 이다.
- 따라서 this 가 따로 존재하지 않는다.
- arguments 가 없다. / rest parameter 사용
- constructor 가 없다. / 생성자 함수 사용 불가
- class 내부에서는 화살표함수 사용 X
- class 내부에서 사용시 생성자가 호출이 될때 함수가 초기화된다.
- 따라서, 자식 class 내부에서 super 로 사용 X
- 또, 자식 class 에서 override 불가 (자식 클래스가 생성되면서 부모클래스도 호출이 되는데 그때 우선순위가 부모 클래스인듯?)
- 제너레이터에서 yield 에서 사용불가. (문법 지원하지 않음)

### 순수함수

- side effect 가 전혀 없는 함수
- 동일한 parameter 이면 항상 동일한 값을 return 

```js
const obj = {
  say: 'hello'
}

// 원본 obj 의 값이 변하기 때문에 순수함수 X
function f1(targetObj) {
  targetObj.say = 'No!';

  return targetObj;
}

console.log(obj); // hello
f1(obj);
console.log(obj); // No!

// 복제한 obj 를 반환하는 순수함수
function f2(targetObj) {
  return {...targetObj, say: 'No'};
}
```

### 클로저 Closure

- 클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것

```js
function add(a) {
  return function (b) { // 내부함수가 외부함수의 스코프에 접근
    return a + b;
  }
}

add10 = add(10);
console.log(add10(66));
```