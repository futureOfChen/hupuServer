cordova.define('cordova/plugin_list', function (require, exports, module) {
    var exports = [];
    var plugins = {
        'Acceleration': {
            "file": 'plugins/Acceleration.js',
            "id": "org.apache.cordova.device-motion.Acceleration",
            "clobbers": [
                "Acceleration"
            ]
        },
        'accelerometer': {
            "file": 'plugins/accelerometer.js',
            "id": "org.apache.cordova.device-motion.accelerometer",
            "clobbers": [
                "navigator.accelerometer"
            ]
        }
    };

    var el = document.getElementById('cordova-plugins');
    if (el) {
        var pluginArray = el.value.split(',');

        for (var i in pluginArray) {
            exports.push(plugins[pluginArray[i]]);
        }
    }

    module.exports = exports;
});