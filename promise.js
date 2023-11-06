const STATUS = {
  pending: 0,
  fulfilled: 1,
  rejected: 2,
};

const getThen = (value) => {
  if (value && typeof value.then === "function") {
    return value.then;
  }
};

const myPromise = (callback) => {
  let status = STATUS.pending;
  let value;
  let handlers = [];

  // example code
  // handlers = [{ onFulfill: <first arg of then>, onReject: <second arg of
  //     then>}]

  const fulfill = (result) => {
    status = STATUS.fulfilled;
    value = result;
    handlers.forEach((handler) => {
      handler.onFulfill(value);
    });
  };

  const reject = (result) => {
    status = STATUS.rejected;
    value = result;
    handlers.forEach((handler) => {
      handler.onReject(value);
    });
  };

  const process = (fn) => {
    fn(
      // this is resolve
      (result) => {
        const then = getThen(result);
        if (then) {
          process(then);
        }
        fulfill(result);
      },
      // this is reject
      (error) => {
        reject(error);
      }
    );
  };

  function handle(onFulfill, onReject) {
    // save if pending
    if (status === STATUS.pending) handlers.push({ onFulfill, onReject });

    // call with the result if already resolved/rejected
    if (status === STATUS.fulfilled) onFulfill(value);
    if (status === STATUS.rejected) onReject(value);
  }

  this.then = (onFulfill, onReject) => {
    return new myPromise((resolve, reject) => {
      // do something
      handle(
        (result) => resolve(onFulfill(result)),
        (error) => resolve(onReject(error))
      );
    });
  };

  process(callback);
};

// mock implementation

// new APlus((resolve, reject) => {
//   resolve({ dummy: 1 }); // works
//   resolve(2); // also works
//   resolve(Promise.resolve(12)); // it won't yield 12 as value
//   // but resolve with the Promise object itself
// });
