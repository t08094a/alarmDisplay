const Facade = require('../../lib/facade');
const alarmInfoSchema = require('./schema');

class AlarmInfoFacade extends Facade {}

module.exports = new AlarmInfoFacade(alarmInfoSchema);
