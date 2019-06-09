const USER = "user";
const PASSWORD = "pass";
const COLLECTION = "ExpressApplication";

module.exports = {
    dev: `mongodb+srv://${USER}:${PASSWORD}@mycluster-z4ipm.mongodb.net/${COLLECTION}--dev?retryWrites=true`,
    test: `mongodb+srv://${USER}:${PASSWORD}@mycluster-z4ipm.mongodb.net/${COLLECTION}--test?retryWrites=true`,
}