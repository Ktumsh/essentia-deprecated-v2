export enum ErrorMessages {
  REQUIRED_EMAIL = "Por favor, ingresa un correo electrónico válido.",
  REQUIRED_PASSWORD = "Por favor, ingresa tu contraseña.",
  REQUIRED_USERNAME = "Por favor, ingresa tu nombre de usuario.",
  REQUIRED_NAME = "Por favor, ingresa tu nombre.",
  REQUIRED_LASTNAME = "Por favor, ingresa tu apellido.",
  REQUIRED_BIRTHDATE = "Por favor, ingresa tu fecha de nacimiento.",
  INVALID_BIRTHDATE = "Debes tener al menos 13 años y la fecha debe ser realista.",
  INVALID_PASSWORD = "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.",
  INVALID_CREDENTIALS = "Credenciales inválidas, por favor revisa tu correo y contraseña.",
  EMAIL_EXISTS = "Este correo electrónico ya está registrado.",
  UNKNOWN_ERROR = "Ocurrio un error inesperado.",
  LOGIN_ROUTE_ERROR = "No se pudo iniciar sesión después del registro",
  ACCOUNT_CREATED_ERROR = "No se pudo crear la cuenta.",
  EMAIL_VERIFICATION_ERROR = "No se pudo verificar el correo.",
  ERROR = "Ha ocurrido un error.",
}