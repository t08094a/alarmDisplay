const Controller = require('../../lib/controller');
const alarmInfoFacade = require('./facade');

class AlarmInfoController extends Controller {}

module.exports = new AlarmInfoController(alarmInfoFacade);
