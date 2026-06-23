export class UserEntity {
  constructor({ id, names, email, role, subRole, idDocument }) {
    this.id = id;
    this.names = names;
    this.email = email;
    this.role = role;
    this.subRole = subRole;
    this.idDocument = idDocument;
  }
}
