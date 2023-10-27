module.exports = (sequelize, DataTypes) => {
    const Servicio = sequelize.define('Servicio', {
      idSolicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idPrestador: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      costoTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    }, {
      tableName: 'servicio',
      timestamps: false,
    });
  
    Servicio.associate = function (models) {
      //  relación con la tabla Presupuesto
      Servicio.belongsTo(models.Presupuesto, {
        foreignKey:'idSolicitud',
        as: 'presupuesto',
      });
  
      Servicio.belongsTo(models.Presupuesto, {
        foreignKey: {
          name: 'idPrestador',
          allowNull: false,
        },
        targetKey: 'idPrestador',
        as: 'presupuestoPrestador',
      });
    };
  
    return Servicio;
  };
  