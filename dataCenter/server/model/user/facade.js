const Facade = require('../../lib/facade');
const accountSchema = require('./schema');

class AccountFacade extends Facade {
  update(...args) {
    return this.model
      .update(...args)
      .exec();
  }
}

module.exports = new AccountFacade(accountSchema);
