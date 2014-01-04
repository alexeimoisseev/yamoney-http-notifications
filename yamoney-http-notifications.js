var crypto = require('crypto');

module.exports = function(secret, callback) {
    return function(req, res) {
        var shasum = crypto.createHash('sha1');
        var checkString = req.params.notification_type + '&' +
            req.params.operation_id + '&' +
            req.params.amount + '&' +
            req.params.currency + '&' +
            req.params.datetime + '&' +
            req.params.sender + '&' +
            req.params.codepro + '&' +
            secret + '&' +
            req.params.label;
        shasum.update(checkString);
        var mySha = shasum.digest('hex');
        if (mySha == req.params.sha1_hash) {
            res.send(200);
            callback(null, req.params);
        } else {
            res.send(400, 'Checksum failed');
            callback("SHA1 hash check failed");
        }
    }
};
