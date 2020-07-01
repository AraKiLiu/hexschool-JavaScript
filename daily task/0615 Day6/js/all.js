// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
function sayYouLoveMe() {
  return true;
}

function getAnswer(isAnswer) {
  return (isAnswer ? '愛我' : '不愛我');
}

console.log(getAnswer(sayYouLoveMe()));

console.log(getAnswer(false));

console.log(getAnswer(true));