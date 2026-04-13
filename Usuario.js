class Usuario {
  constructor(id, nombreUsuario, password) {
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.password = password;
  }

  get id() { return this.id; }
  get nombreUsuario() { return this.nombreUsuario; }
  get password() { return this.password; }

  set password(value) { this.password = value; }

}

module.export = Usuario;