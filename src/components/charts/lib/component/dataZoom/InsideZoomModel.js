/**
 * @file Data zoom model
 */


    module.exports = require('./DataZoomModel').extend({

        type: 'dataZoom.inside',

        /**
         * @protected
         */
        defaultOption: {
            disabled: false,   // Whether disable this inside zoom.
            zoomLock: false  // Whether disable zoom but only pan.
        }
    });
