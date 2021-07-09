const Hashids = require("hashids/cjs");
const noiseIdService = () => {
  const hashids = new Hashids(
    "lyfe",
    5,
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );
  return {
    encode: (id) => hashids.encode(id),
    decode: (id) => hashids.decode(id),
  };
};
module.exports = noiseIdService;
