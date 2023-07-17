import { DataTypes } from 'sequelize'
import { SequelizeClient } from '../../storages'

export const TemaSubtemaDefinition = SequelizeClient.define('temasubtema', {
  idTemaSubtema: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idRepositorio: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  nombre: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  descripcion: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  urlVideo: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  urlArchivo: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  esSubtema: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  fechaHora: {
    type: DataTypes.DATE,
    allowNull: true
  },
  idUsers: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'temasubtema',
  timestamps: false
})
