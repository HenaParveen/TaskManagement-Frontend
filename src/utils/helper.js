export function checkEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function getInitials(nameOrEmail) {
  const parts = nameOrEmail.split("");
  if (parts.length > 1) {
    return parts[0] + parts[1];
  } else {
    return parts[0];
  }
}
