var valueChanged = (close, preClose) => {
  if (preClose === 0) {
    return '0';
  }  
  else {
    return ((close - preClose) /  preClose).toString();
  }
};

var color = (open, close) => {
  if (open === close) {
    return 'white';
  }
  else if (open > close) {
    return 'green';
  }
  else {
    return 'red';
  }
};

var goingUp = (close, preClose) => {
  if (close === preClose) {
    return 'even';
  }  
  else if (close > preClose) {
    return 'up';
  }
  else {
    return 'down';
  }
};

var shoulder = (open, close, preclose) => {
  return (Math.max(open, close) - preclose) / preclose;
};

var buttocks = (open, close, preclose) => {
  return (Math.min(open, close) - preclose) / preclose;
};

var head = (high, preclose) => {
  return (high - preclose) / preclose;
};

var feet = (low, preclose) => {
  return (low - preclose) / preclose;
};

var body = (open, close, preclose) => {
  return Math.abs(open - close) / preclose;
};

var whole = (high, low, preclose) => {
  return (high - low) / preclose;  
};

exports.valueChanged = valueChanged;
exports.color = color;
exports.goingUp = goingUp;
exports.shoulder = shoulder;
exports.buttocks = buttocks;
exports.head = head;
exports.feet = feet;
exports.body = body;
exports.whole = whole;
