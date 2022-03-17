const obj = {
  say: 'hello'
}

function f1(targetObj) {
  targetObj.say = 'No!';

  return targetObj;
}


function f2(targetObj) {
  return {...targetObj, say: 'No'};
}

console.log(obj); // hello
f2(obj);
console.log(obj); // No!

