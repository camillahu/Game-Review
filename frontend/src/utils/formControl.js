export function checkWhiteSpace(str) {
  return /\s/.test(str);
}

export function checkPassword(inputPassword1, inputPassword2) {
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (inputPassword1 !== inputPassword2) {
    return { error: "Password doesn't match" };
  } else if (!passwordRegEx.test(inputPassword1)) {
    return {
      error: `Not a valid password. 
        Password must contain at least one number, uppercase letter and lowercase letter, and at least 8 characters.`,
        value: null
    };
  } else {
    return { value: inputPassword1,  error: null };
  }
}

export function checkUsername(inputName) {
  const usernameRegEx = /^[a-z0-9_\.]+$/;

  if (usernameRegEx.test(inputName)) {
    return { value: inputName, error: null  };
  } else {
    return {
      error:
        "Not a valid username. Username can only contain lowercase letters, numbers, _ or .",
        value: null
    };
  }
}
