module.exports = (sequelize, DataTypes) => {
    const Profesion = sequelize.define('Profesion', {
      idProfesion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombreProfesion: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    }, {
      tableName: 'profesion',
      timestamps: false,
    });
  
    Profesion.associate = function (models) {
      // Relación hasMany con la tabla PrestadorProfesiones
      Profesion.hasMany(models.PrestadorProfesiones, {
        foreignKey: 'idProfesion',
        as: 'prestadorProfesiones', 
      });
  
      // Relación hasMany con la tabla SolicitudProfesiones
      Profesion.hasMany(models.SolicitudProfesiones, {
        foreignKey: 'idProfesion',
        as: 'solicitudProfesiones',  
      });
    };
  
    return Profesion;
  };
  