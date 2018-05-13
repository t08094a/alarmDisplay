const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const alarmInfoSchema = new Schema({
  Alarmzeit: { type: Date, required: true },
  Einsatzort: { type: String },
  Schlagwort: { type: String },
  Prioritaet: { type: String },
  Bemerkung: { type: String }
});


module.exports = mongoose.model('AlarmInfo', alarmInfoSchema);
