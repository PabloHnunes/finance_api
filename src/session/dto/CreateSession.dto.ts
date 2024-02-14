export class CreateSessionDTO {
  token: string;
  user_id: string;
  active: boolean;
  date_created: Date;
  date_expiration: Date;
  constructor(
    token: string,
    user_id: string,
    active: boolean,
    date_created: Date,
    date_expiration: Date,
  ) {
    this.token = token;
    this.user_id = user_id;
    this.active = active;
    this.date_created = date_created;
    this.date_expiration = date_expiration;
  }
}
