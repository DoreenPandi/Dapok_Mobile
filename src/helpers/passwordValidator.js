export function passwordValidator(password) {
    if (!password) return "This field is required *"
    if (password.length < 5) return "Password must be at least 5 characters long."
    return ""
}