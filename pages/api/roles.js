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
    .updateOwn("password")
    .deleteOwn("profile");
    
    ac.grant("seller")
    .readOwn("profile")
    .updateOwn("profile")
    .updateOwn("password")
    .deleteOwn("profile")
    .readAny("reviews")
    .createOwn("products")
    .updateOwn("products")
    .deleteOwn("products")
    .readOwn("store");

  return ac;
})();

export default roles;
