const states = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
};
class AplusPromise {
  constructor(computation) {
    this._state = states.PENDING;
    this._value = null;
    this._reason = null;
    this._thenQueue = [];
    this._finallyQueue = [];
    setTimeout(() => {
      try {
        if (typeof computation == "function") {
          computation(
            this._onFulFilled.bind(this),
            this._onRejected.bind(this)
          );
        }
      } catch (e) {}
    });
  }
  then(fulfilleFn, catchFn) {}
  catch() {}
  finally() {}
  _propagateFulfilled() {}
  _propagateRejected() {}

  _onFulFilled(value) {
    if (this._state === states.PENDING) {
      this._value = value;
      this._state = states.FULFILLED;
      this._propagateFulfilled();
      console.log("resolved with value " + value);
    }
  }
  _onRejected(reason) {
    if (this._state === states.PENDING) {
      this._reason = reason;
      this._state = states.REJECTED;
      this._propagateRejected();
      console.log("rejected with value " + reason);
    }
  }
}

const promise = new AplusPromise((resolve, reject) => {
  setTimeout(() => resolve(42), 1000);
});
