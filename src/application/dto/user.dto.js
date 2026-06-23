export const UserUpdateDto = ({ names, email, idDocument, role, subRole }) => ({
  names: typeof names === 'string' ? names.trim() : '',
  email: typeof email === 'string' ? email.trim() : '',
  idDocument: typeof idDocument === 'string' ? idDocument.trim() : '',
  role,
  subRole,
});
