const proDeployLogs = require('../schemas/proDeployLogs');

const createTestConfigJsLog = () => {
    return proDeployLogs.createDeployLog(null, {
        name: 'Test Config Js',
        code: 'TEST_CONFIG_JS',
        file: './test.config.js',
        status: 'Y'
    });
}

const fetchTestConfigJsLog = () => {
    return proDeployLogs.findDeployLogByCode(null, 'TEST_CONFIG_JS');
}


module.exports = {
    createTestConfigJsLog,
    fetchTestConfigJsLog
};