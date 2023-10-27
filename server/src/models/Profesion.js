module.exports = (sequelize, DataTypes) => {
    const Profesion = sequelize.define('Profesion', {
      idProfesion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        as: 'prestador_profesiones',
      });
  
      Profesion.hasMany(models.Solicitud, {
        as: 'solicitudes_profesion',
        foreignKey: 'idProfesion',
      });
    };
  
    return Profesion;
  };
  