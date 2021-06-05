const connection = require('../config/connection');

function index(req, res){
   if(connection){
      let sql = "SELECT * FROM categorias";
      connection.query(sql, (err, resp) => {
      if(err)
         res.json(err);
      else
         res.json(resp);
      });
   }
}

function show(req, res){
   if(connection){
      const { id } = req.params;
      let sql = `SELECT * FROM categorias WHERE id = ${connection.escape(id)}`;
      connection.query(sql, (err, resp) => {
        if(err)
            res.json(err);
        else{
           let mensaje1 = "";
           if(resp === undefined || resp.length == 0)
            mensaje1 = "Categoría no encontrada";
            res.json({data: resp, mensaje: mensaje1});
        }
      });
   }
}

function create(req, res){
   if(connection){
      const categoria = req.body;

      //Validaciones
      if(!categoria.nombre)
         return res.status(400).send({
            error: true,
            mensaje: "El nombre es necesario"
         });
      if(categoria.nombre.length > 50)
         return res.status(400).send({
            error: true,
            mensaje: "La longitud máxima del nombre es de 50"
         });

      let sql = "INSERT INTO categorias set ?";
      connection.query(sql,[categoria], (err, resp) => {
         if(err)
            res.json(err);
         else
            res.json({data: resp, mensaje: "Categoría creada con exito"});
      });
   }
}

function destroy(req, res){
   if(connection){
      const { id } = req.params;
      let sql = `DELETE FROM categorias where id = ${connection.escape(id)}`;
      connection.query(sql, (err, resp) => {
      if(err)
         res.json(err);
      else
         res.json({
            data: resp,
            mensaje: "Categoria borrada con éxito"
        });
      });
   }
}

module.exports = {
   index,
   show,
   create,
   destroy
};