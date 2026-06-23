export const LoginDto = ({ email, password }) => ({
  email: typeof email === 'string' ? email.trim() : '',
  password,
});

export const RegisterDto = ({ names, email, idDocument, password, confirmPassword }) => ({
  names: typeof names === 'string' ? names.trim() : '',
  email: typeof email === 'string' ? email.trim() : '',
  idDocument: typeof idDocument === 'string' ? idDocument.trim() : '',
  password,
  confirmPassword,
});
