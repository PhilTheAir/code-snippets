var cron = require('cron');
var cronDl = cron.job('59 20 22 * * 1-5', 'C:/Program20%Files/nodejs/node.exe C:/Users/ICBC/Documents/GitHub/NodeJS/Stock/controllers/tt.js');
// var cronAnalyze = cron.job('00 50 19 * * 1-5', 'C:/Users/ICBC/Documents/GitHub/NodeJS/Stock/controllers/analyze.js');
cronDl.start();
// cronAnalyze.start();
