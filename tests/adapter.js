const myPromise = require("../promise");

const adapter = {
  deferred() {
    let reject, resolve;
    const promise = new APlus((res, rej) => {
      reject = rej;
      resolve = res;
    });
    return {
      promise,
      resolve,
      reject,
    };
  },
  resolved: (val) => new myPromise((res) => res(val)),
  rejected: (val) => new myPromise((_, rej) => rej(val)),
};
module.exports = adapter;
