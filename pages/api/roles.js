const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (function () {
  ac.grant("user")
    .createOwn("orders")
    .readOwn("orders")
    .readAny("products")
    .readAny("reviews")
    .createOwn("reviews")
    .updateOwn("reviews")
    .deleteOwn("reviews")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile")
    .updateOwn("password");

  ac.grant("seller")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile")
    .readAny("reviews")
    .updateOwn("password")
    .createOwn("products")
    .updateOwn("products")
    .deleteOwn("products");

  return ac;
})();

export default roles;
