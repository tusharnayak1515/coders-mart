const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (function () {
  ac.grant("user")
    .createOwn("orders")
    .readOwn("orders")
    .readOwn("cart")
    .updateOwn("cart")
    .readAny("products")
    .readAny("reviews")
    .createOwn("reviews")
    .updateOwn("reviews")
    .deleteOwn("reviews")
    .createOwn("likes")
    .updateOwn("likes")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile");

  ac.grant("seller")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile")
    .readAny("reviews")
    .createOwn("products")
    .updateOwn("products")
    .deleteOwn("products");

  return ac;
})();

export default roles;
