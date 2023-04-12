// config-overrides.js
module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
    // console.log(JSON.stringify(config.resolve.fallback))
     config.resolve.fallback = {
         crypto: false,
     };  
     return config
 }