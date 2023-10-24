export class AuthUserDTO {
  id: number;
  name: string;
  email: string;
  document: string;
  profile_id: number;
  username: string;

  constructor(
    id: number,
    name: string,
    email: string,
    document: string,
    profile_id: number,
    username: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.document = document;
    this.profile_id = profile_id;
    this.username = username;
  }
}
