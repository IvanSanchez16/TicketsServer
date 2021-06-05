const connection = require("../config/connection");

function index(req, res) {
  if (connection) {
    let sql = "SELECT * FROM personal";
    connection.query(sql, (err, resp) => {
      if (err) res.json(err);
      else res.json(resp);
    });
  }
}

function show(req, res) {
  if (connection) {
    const { id } = req.params;
    let sql = `SELECT * FROM personal WHERE id = ${connection.escape(id)}`;
    connection.query(sql, (err, resp) => {
      if (err) res.json(err);
      else {
        let mensaje1 = "";
        if (resp === undefined || resp.length == 0)
          mensaje1 = "Persona no encontrada";
        res.json({ data: resp, mensaje: mensaje1 });
      }
    });
  }
}

function create(req, res) {
  if (connection) {
    const persona = req.body;

    //Validaciones
    if (!persona.nombre)
      return res.status(400).send({
        error: true,
        mensaje: "El nombre es necesario",
      });
    if (!persona.apellidos)
      return res.status(400).send({
        error: true,
        mensaje: "El apellido es necesario",
      });
    if (persona.nombre.length > 50)
      return res.status(400).send({
        error: true,
        mensaje: "La longitud máxima del nombre es de 50",
      });
    if (persona.apellidos.length > 80)
      return res.status(400).send({
        error: true,
        mensaje: "La longitud máxima del apellido es de 80",
    });
    if (persona.telefono.length > 10)
      return res.status(400).send({
        error: true,
        mensaje: "La longitud máxima del telefono es de 10",
    });  

    let sql = "INSERT INTO personal set ?";
    connection.query(sql, [persona], (err, resp) => {
      if (err) res.json(err);
      else res.json({ data: resp, mensaje: "Persona creada con exito" });
    });
  }
}

function update(req, res) {
    if (connection) {
        const { id } = req.params;
        const persona = req.body;
    
        //Validaciones
        if (persona.nombre && persona.nombre.length > 50)
          return res.status(400).send({
            error: true,
            mensaje: "La longitud máxima del nombre es de 50",
          });
        if (persona.apellidos && persona.apellidos.length > 80)
          return res.status(400).send({
            error: true,
            mensaje: "La longitud máxima del apellido es de 80",
        });
        if (persona.telefono && persona.telefono.length > 10)
          return res.status(400).send({
            error: true,
            mensaje: "La longitud máxima del telefono es de 10",
        });  
    
        let sql = `UPDATE personal set ? where id = ${connection.escape(id)}`;
        connection.query(sql, [persona], (err, resp) => {
          if (err) res.json(err);
          else {
            let mensaje1 = "";
            if (resp.affectedRows == 0)
              mensaje1 = "Persona no encontrada";
            res.json({ data: resp, mensaje: mensaje1 });
          }
        });
    }
}

function destroy(req, res) {
  if (connection) {
    const { id } = req.params;
    let sql = `DELETE FROM personal where id = ${connection.escape(id)}`;
    connection.query(sql, (err, resp) => {
      if (err) res.json(err);
      else res.json({
          data: resp,
          mensaje: "Persona borrada con éxito"
      });
    });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
