import { DataTypes } from 'sequelize'
import { SequelizeClient } from '../../storages'

export const CalendarioDefinition = SequelizeClient.define('calendario', {
  idCalendario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_modalidad: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  idCurso: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  horaInicio: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  horaFin: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  idStatusCalendario: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  idInstructor: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  pagoInstructor: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  evdet_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  costo: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  descuento: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true
  },
  fechadescuento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  idsala: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  locacion: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  modificaciones: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  user: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  visible: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  automatico: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  idCalendarioNotificacion: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  meetingid: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
}, {
  tableName: 'calendario',
  timestamps: false
})
