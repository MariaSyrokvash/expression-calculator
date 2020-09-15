let numberOfStack = [];
let operationOfStack = [];

const executionQueue = {
  "-": 1,
  "+": 1,
  "/": 2,
  "*": 2
};

function expressionCalculator(expression) {
  if (checkAllBrackets(expression) == false) {
    throw new Error("ExpressionError: Brackets must be paired")
  }

  const analyzedExpression = analyzedString(expression);

  for(let i = 0; i < analyzedExpression.length; i++) {
    if (typeof(analyzedExpression[i]) == 'number') {
      numberOfStack.push(analyzedExpression[i]);
    } 
    else if (analyzedExpression[i] == "(") operationOfStack.push(analyzedExpression[i]);
    else if (analyzedExpression[i] == ")") {
      while(operationOfStack[operationOfStack.length - 1]
      != '(') getСalculations();
      operationOfStack.pop();
    }
    else {
      while(true) {
        if(operationOfStack.length == 0 || operationOfStack[operationOfStack.length - 1] 
        === '(' || executionQueue[analyzedExpression[i]]
        > executionQueue[operationOfStack[operationOfStack.length - 1]]) {
          operationOfStack.push(analyzedExpression[i]);
          break;
        }
        else getСalculations();
      }
    }
  }
  while(operationOfStack.length != 0) getСalculations();
  let result = numberOfStack.pop();
  numberOfStack = [];
  operationOfStack = [];
  return result;
}

function calculateExpression (x, y, operation) {
  let result = 0;
  switch (operation) {
  case '+':
    result = x + y;
    break;
  case '-':
    result = x - y;
    break;
  case '*':
    result = x * y;
    break;
  case '/':
    if(y === 0) {
      numberOfStack = [];
      operationOfStack = [];
      throw new Error("TypeError: Division by zero.");
    }
    result = x / y; 
  }
  return result;
}

function analyzedString(expr) {
  let arrayOfExpression = [];

  const lengthOfExpression = expr.length;
  let number = '';
  for(let i = 0; i < lengthOfExpression; i++) {
    let code = expr.charCodeAt(i);
    if(code >= 48 && code <=57) number += expr[i];
    else {
      if(number != "") {
        arrayOfExpression.push(parseInt(number));
        number = "";
      }
      if(expr[i] != " ") arrayOfExpression.push(expr[i]);
    }
  }
  if(number != "") arrayOfExpression.push(parseInt(number));

  return arrayOfExpression;
}

function checkAllBrackets(args) {
  let openBrackets = 0;
  let closedBrackets = 0;
  const lengthOfArgs = args.length;

  for(let i = 0; i < lengthOfArgs; i++) {
    if(args[i] == '(') openBrackets++;
    else if(args[i] == ')') closedBrackets++;
  }
  if(openBrackets == closedBrackets) {
    return true;
  } 
  else  {
    return false;
  }
}

function getСalculations() {
  const y = numberOfStack.pop();
  const x = numberOfStack.pop();
  const currentValue = operationOfStack.pop();
  const value = calculateExpression(x, y, currentValue);
  numberOfStack.push(value);
}

module.exports = {
  expressionCalculator
}