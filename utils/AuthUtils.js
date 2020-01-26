exports.saveUserToken = response => {
  if (process.browser) {
    sessionStorage.setItem("token", response.token);
    sessionStorage.setItem("CurrentUser", response.data.user);
  }
};

exports.clearUserToken = response => {
  if (process.browser) {
    sessionStorage.clear(); // remove all keys
  }
};

exports.getCurrentUserToken = () => {
  if (process.browser) {
    return sessionStorage.getItem("DOWToken");
  }
};

const getClientSideUser = () => {};
