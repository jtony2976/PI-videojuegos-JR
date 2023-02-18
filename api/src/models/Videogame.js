const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // (sequelize) --> es la instancia con la conexion a la base de datos
  // UUID --> tipo usado para crear una columna que guarde identificadores unicos universales (unique universal identifiers)
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type:DataTypes.STRING,
      allowNull: true
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
}, {
   timestamps: false
  });
};
