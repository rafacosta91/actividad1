function obtenerNombre() {
  const nombresAlemanes = [
    "Hans Dieter", "Peter Herbert", "Karl Jürgen", "Heinz Gerhard", "Fritz Bernd",
    "Johann Uwe", "Otto Werner", "Georg Friedrich", "Max Rainer", "Paul Wilhelm",
    "Franz Erich", "Ernst Eberhard", "Rudolf Gustav", "Walter Adolf", "Wolfgang Ludwig",
    "Manfred Otmar", "Günter Siegfried", "Helmut Egbert", "Horst Harald", "Kurt Ulrich",
    "Hans Dieter", "Peter Herbert", "Karl Jürgen", "Heinz Gerhard", "Fritz Bernd",
    "Johann Uwe", "Otto Werner", "Georg Friedrich", "Max Rainer", "Paul Wilhelm",
    "Franz Erich", "Ernst Eberhard", "Rudolf Gustav", "Walter Adolf", "Wolfgang Ludwig",
    "Manfred Otmar", "Günter Siegfried", "Helmut Egbert", "Horst Harald", "Kurt Ulrich",
    "Hans Dieter", "Peter Herbert", "Karl Jürgen", "Heinz Gerhard", "Fritz Bernd",
    "Johann Uwe", "Otto Werner", "Georg Friedrich", "Max Rainer", "Paul Wilhelm",
    "Franz Erich", "Ernst Eberhard", "Rudolf Gustav", "Walter Adolf", "Wolfgang Ludwig",
    "Manfred Otmar", "Günter Siegfried", "Helmut Egbert", "Horst Harald", "Kurt Ulrich",
    "Hans Dieter", "Peter Herbert", "Karl Jürgen", "Heinz Gerhard", "Fritz Bernd",
    "Johann Uwe", "Otto Werner", "Georg Friedrich", "Max Rainer", "Paul Wilhelm",
    "Franz Erich", "Ernst Eberhard", "Rudolf Gustav", "Walter Adolf", "Wolfgang Ludwig",
    "Manfred Otmar", "Günter Siegfried", "Helmut Egbert", "Horst Harald", "Kurt Ulrich",
    "Hans Dieter", "Peter Herbert", "Karl Jürgen", "Heinz Gerhard", "Fritz Bernd",
    "Johann Uwe", "Otto Werner", "Georg Friedrich", "Max Rainer", "Paul Wilhelm",
    "Franz Erich", "Ernst Eberhard", "Rudolf Gustav", "Walter Adolf", "Wolfgang Ludwig",
    "Manfred Otmar", "Günter Siegfried", "Helmut Egbert", "Horst Harald", "Kurt Ulrich"
  ];

  return nombresAlemanes[Math.floor(Math.random() * nombresAlemanes.length)];
}

function obtenerApellido() {
  const apellidosAlemanes = [
    "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner",
    "Becker", "Schulz", "Hoffmann", "Schäfer", "Koch", "Bauer", "Richter",
    "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann",
    "Braun", "Krüger", "Hofmann", "Hartmann", "Lange", "Schmitt", "Werner",
    "Schmitz", "Krause", "Meier", "Lehmann", "Schmid", "Schulze", "Maier",
    "Köhler", "Herrmann", "König", "Walter", "Mayer", "Huber", "Kaiser",
    "Fuchs", "Peters", "Lang", "Scholz", "Möller", "Weiß", "Jung", "Hahn",
    "Schubert", "Vogel", "Friedrich", "Keller", "Günther", "Frank", "Berger",
    "Winkler", "Roth", "Beck", "Lorenz", "Baumann", "Franke", "Albrecht",
    "Schuster", "Simon", "Ludwig", "Böhm", "Winter", "Kraus", "Martin",
    "Schumacher", "Krämer", "Vogt", "Stein", "Jäger", "Otto", "Sommer",
    "Groß", "Seidel", "Heinrich", "Brandt", "Haas", "Schreiber", "Graf",
    "Dietrich", "Ziegler", "Kuhn", "Pohl", "Engel", "Horn", "Busch", "Bergmann",
    "Thomas", "Voigt", "Sauer", "Arnold", "Wolff", "Pfeiffer"
  ];

  return apellidosAlemanes[Math.floor(Math.random() * apellidosAlemanes.length)];
}

function generar() {
  let texto = "INSERT INTO alumnos(matricula, apellido_uno, apellido_dos, nombres, correo) VALUES ";
  for (let i = 1; i <= 20000; i++) {
    const matricula = `211${i}`.padStart(8, 0);
    texto += `(
    ${matricula},
    "${obtenerApellido()}",
    "${obtenerApellido()}",
    "${obtenerNombre()}",
    "${matricula}@uthermosillo.edu.mx"
    )${i == 20000 ? ";" : ","}<br>`;
  }
  document.getElementById("texto").innerHTML = texto;
}

function descargarSQL() {
  let query = "DROP DATABASE IF EXISTS sistema_escolar;\n";
  query += "CREATE DATABASE IF NOT EXISTS sistema_escolar  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;\n";
  query += "USE sistema_escolar;\n";
  query+= `CREATE TABLE IF NOT EXISTS alumnos(
    matricula VARCHAR(255) NOT NULL UNIQUE,
    apellido_uno VARCHAR(50) NOT NULL,
    apellido_dos VARCHAR(50) NULL,
    nombres VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL);\n`;
  query += document.getElementById("texto").innerHTML.replace(/<br>/g, "");


  const blob = new Blob([query], { type: "text/sql;text/plain;charset=UTF-8" });
  const url = URL.createObjectURL(blob);

  // Descargar
  const a = document.createElement("a");
  a.href = url;
  a.download = "alumnos.sql";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  console.log('descargando');
}
