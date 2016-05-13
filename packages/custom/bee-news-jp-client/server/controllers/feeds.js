'use strict';

module.exports = function() {
  return {
    test: function(req, res) {
      return res.status(200).json({
        msg: 'Token invalid or expired'
      });
    }
  };
}
