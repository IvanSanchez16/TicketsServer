const connection = require("../config/connection");

function index(req, res) {
  if (connection) {
    let sql = "SELECT tickets.id as id,tickets.nombre as nombre, tickets.descripcion as descripcion, tickets.prioridad as prioridad, concat_ws(' ',personal.nombre,personal.apellidos) as reportero, categorias.nombre as categoria, tickets.estatus as estatus FROM tickets inner join personal on tickets.reportero = personal.id inner join categorias on categorias.id = tickets.categoria";
    connection.query(sql, (err, resp) => { 
      if (err) res.json(err);
      else res.json(resp);
    });
  }
}

function show(req, res) {
  if (connection) {
    const { id } = req.params;
    let sql = `SELECT * FROM tickets WHERE id = ${connection.escape(id)}`;
    connection.query(sql, (err, resp) => {
      if (err) res.json(err);
      else {
        let mensaje1 = "";
        if (resp === undefined || resp.length == 0)
          mensaje1 = "Ticket no encontrado";
        res.json({ data: resp, mensaje: mensaje1 });
      }
    });
  }
}

function create(req, res) {
  if (connection) {
    const ticket = req.body;

    //Validaciones
    if (!ticket.nombre)
      return res.status(400).send({
        error: true,
        mensaje: "El nombre es necesario",
      });
    if (!ticket.descripcion)
      return res.status(400).send({
        error: true,
        mensaje: "La descripcion es necesario",
      });
      if (!ticket.reportero)
      return res.status(400).send({
        error: true,
        mensaje: "El reportero es necesario",
      });
      if (!ticket.categoria)
      return res.status(400).send({
        error: true,
        mensaje: "La categoria es necesaria",
      });
    if (ticket.nombre.length > 50)
      return res.status(400).send({
        error: true,
        mensaje: "La longitud máxima del nombre es de 50",
      });
    if (ticket.descripcion.length > 100)
      return res.status(400).send({
        error: true,
        mensaje: "La longitud máxima de la descripcion es de 100",
    });

    ticket.estatus = 'ABT';

    let sql = "INSERT INTO tickets set ?";
    connection.query(sql, [ticket], (err, resp) => {
      if (err) res.json(err);
      else res.json({ data: resp, mensaje: "Ticket creado con exito" });
    });
  }
}

function update(req, res) {
    if (connection) {
        const { id } = req.params;
        const ticket = req.body;
    
        //Validaciones
        if (ticket.nombre && ticket.nombre.length > 50)
          return res.status(400).send({
            error: true,
            mensaje: "La longitud máxima del nombre es de 50",
          });
        if (ticket.apellidos && ticket.apellidos.length > 80)
          return res.status(400).send({
            error: true,
            mensaje: "La longitud máxima del apellido es de 80",
        });
        if (ticket.telefono && ticket.telefono.length > 10)
          return res.status(400).send({
            error: true,
            mensaje: "La longitud máxima del telefono es de 10",
        });  
    
        let sql = `UPDATE tickets set ? where id = ${connection.escape(id)}`;
        connection.query(sql, [ticket], (err, resp) => {
          if (err) res.json(err);
          else {
            let mensaje1 = "";
            if (resp.affectedRows == 0)
              mensaje1 = "Ticket no encontrado";
            res.json({ data: resp, mensaje: mensaje1 });
          }
        });
    }
}

function updateEstatus(req, res) {
    if (connection) {
        const { id } = req.params;
        const ticket = req.body;
    
        //Validaciones
        if (!ticket.estatus)
            return res.status(400).send({
                error: true,
                mensaje: "Es necesario proporcionar un estatus",
            }); 
        if (ticket.estatus.length > 3)
          return res.status(400).send({
            error: true,
            mensaje: "La longitud máxima del estatus es de 3",
          });  
    
        let sql = `UPDATE tickets set estatus = ${connection.escape(ticket.estatus)} where id = ${connection.escape(id)}`;
        connection.query(sql, (err, resp) => {
          if (err) res.json(err);
          else {
            let mensaje1 = "";
            if (resp.affectedRows == 0)
              mensaje1 = "Ticket no encontrado";
            res.json({ data: resp, mensaje: mensaje1 });
          }
        });
    }
}

function destroy(req, res) {
  if (connection) {
    const { id } = req.params;
    let sql = `DELETE FROM tickets where id = ${connection.escape(id)}`;
    connection.query(sql, (err, resp) => {
      if (err) res.json(err);
      else res.json({
          data: resp,
          mensaje: "Ticket borrado con éxito"
      });
    });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  updateEstatus,
  destroy,
};