export function passwordValidator(password){
    if (!password) return "Password can't be empty";
    if (password.length < 8) return "Password must have at least 8 character!";
    return '';
}