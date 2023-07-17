import { DataTypes } from 'sequelize'
import { SequelizeClient } from '../../storages'

export const RepositorioDefinition = SequelizeClient.define('repositorio', {
  idRepositorio: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  descripcion: {
    type: DataTypes.STRING(500),
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
  activo: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  clave: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
    unique: true
  },
  url: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  publico: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'repositorio',
  timestamps: false
})
