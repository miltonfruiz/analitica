const mongoose = require('mongoose');

const analyticSchema = new mongoose.Schema({
  title: String,
  description: String,
  data: Array
});

module.exports = mongoose.model('Analytic', analyticSchema);