/*
 *  Project: Handle Parameters
 *  Description: Provides a variety of methods to handle parameters
 *  Author: Loren Posen
 *  License:
 */

;(function ($, window, document, undefined) {

    var pluginName = "handleParams",
        dataKey = "plugin_" + pluginName;

    var Plugin = function (element, options) {
        this.element = element;

        this.options = {
            noParamHandler: null,
            params: [],
            handleIndivParam: null
        };

        this.init(options);
    };

    Plugin.prototype = {
        // initialize options
        init: function (options) {
            $.extend(this.options, options);
        },

        /**
         * Checks if there is a parameter in the url
         * @return {Boolean} true if there is a parameter, false if not
         */
        hasParameter: function  () {
            var self = this,
                sPageURL = window.location.search.substring(1);
             
             if(sPageURL.toString().length > 1) {
                return true;
             } else if(window.location.hash.length > 1) {
                return true;
             } else {
                return false;
             }

        },

        /**
         * Gets the value of a given perameter within a url
         * @param  {string} sParam This is the parameter Key
         * @return {string}        Returns the value of the parameter
         */
        getParamValue: function(sParam) {
            var self = this,
                sPageURL = $('.lt-ie10').length ? window.location.hash.split("?").pop() : window.location.search.substring(1),
                sURLVariables = sPageURL.split('&');

            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) 
                {
                    return sParameterName[1];
                }
            }
        },

        /**
         * Loops through the parameters.  Contains methods for greater control by user.
         * @return {self} 
         */
        parseParams: function() {
            var self = this,
                hasParams = self.hasParameter();

            if (!hasParams) {
                $.isFunction( self.options.noParamHandler) && self.options.noParamHandler.apply(this);
            }

            for (i = 0; i < self.options.params.length; i++) {
                var p = self.options.params[i],
                    val = self.getParamValue(key);

                $.isFunction( self.options.handleIndivParam) && self.options.handleIndivParam.apply(this, [i, p, val]);
            }

            return self;

        },
    };

    $.fn[pluginName] = function (options) {

        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if (plugin instanceof Plugin) {
            // if have options arguments, call plugin.init() again
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Plugin(this, options);
            this.data(dataKey, plugin);
        }

        return plugin;
    };

}(jQuery, window, document));
