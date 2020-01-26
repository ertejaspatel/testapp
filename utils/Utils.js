exports.isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

// exports.milliseconds = (h, m, s) => (h * 60 * 60 + m * 60 + s) * 1000;
exports.milliseconds = (d = 0, h = 0, m = 0, s = 0) => {
  return (d * 24 * 60 * 60 + h * 60 * 60 + m * 60 + s) * 1000;
};


exports.getFullName = (firstName, lastName) => {
  firstName = firstName ? firstName.trim() : "";
  lastName = lastName ? lastName.trim() : "";
  let fullName = firstName + " " + lastName;
  return fullName.trim();
}