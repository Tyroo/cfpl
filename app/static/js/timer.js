
class Timer {
  constructor(sleep=5, task) {
    this._state = true;
    this.sleep = sleep;
    this._timer = null;
    this.task = task;
    this._stack = [];
    this._lock = true;
    this._debug(sleep, task);
  }
  
  _debug(sleep, task) {
    if (isNaN(sleep)) {
      throw new Error(
      "'sleep' is not a number type");
    }
    if ((typeof task) !== 'function') {
      throw new Error("Task object should be a function");
    }
  }
  
  _timerTask() {
    let s = this._state;
    clearInterval(this._stack.shift());
    console.log(this._stack.length);
    if (!s) return;

    this._stack.push(setInterval(() => {
     this._timerTask();
    }, this.sleep*1000));
    console.log(this._stack.length);
    this.task();
  }
  
  start() {
    if (this._lock) {
      this._lock = false;
      this._state = true;
      this._timerTask();
    }
  }
  
  stop() {
    this._lock = true;
    this._state = false;
  }
}

export default Timer;