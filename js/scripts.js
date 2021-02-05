/*!
    * Start Bootstrap - Creative v6.0.4 (https://startbootstrap.com/theme/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
    */
    (function($) {
        "use strict"; // Start of use strict

        window.MHX = {
            _APP_SETTINGS: window.MHX_APP_CONFIG || {},
            _DATA: null,

            Services: {
                /**
                 * _makeCall()
                 *
                 * @param opts Object
                 *   url String
                 *   successCallback Function
                 *   errorCallback Function
                 */
                _makeCall: (opts) => {
                    console.log(opts)

                    if(opts) {
                        if( opts.successCallback ) opts.successCallback()
                    }
                },

                getSomething: (cb, errorCb) => {
                    window.MHX.Services._makeCall({url: "URLHERE", successCallback: cb})
                },

                /**
                 *
                 *
                 */
                getAppData: ( cb, errorCb, forceRefresh ) => {


                    return new Promise( (cb, errorCb) => {

	                   if( !window.MHX._DATA || forceRefresh ) {

	                           $.when.apply($, window.MHX._APP_SETTINGS.apis.gAppSheets.map( url => $.ajax(url)))
	                               .done(function() {
	                                   var results = [];

	                                    if( !window.MHX._DATA ) window.MHX._DATA = {}

	                                   // there will be one argument passed to this callback for each ajax call
	                                   // each argument is of this form [data, statusText, jqXHR]
	                                   for (var i = 0; i < arguments.length; i++) {
	                                       let data = arguments[i][0]
	                                       results.push(data);

	                                       // we'll ignore the results for now and fill up our own DATA
	                                       switch( data.range.split("!")[0] ) {
	                                            case "APP":
	                                                        window.MHX._DATA.appConfig = data.values
	                                                        break

	                                            case "PORTFOLIO":
	                                                        window.MHX._DATA.portfolio = data.values
	                                                        break

                                                case "HOME":
                                                            window.MHX._DATA.home = data.values
                                                            break
	                                       }
	                                   }

	                                   // all data is now in the results array in order
	                                   // console.log(results)
                                       if( cb ) cb()
	                               });
	                   } else if ( window.MHX._DATA) {
                            // we got DATA
                            if( cb ) cb()
                       } else {
                            // something is very wrong :(
                            console.log("ERR: Super bad!")
                            errorCb()
                       }

                    })
                },


                /**
                 *
                 *
                 */
                getPortFolioData: ( cb, errorCb ) => {
                    // TODO handle errors
                    return new Promise( (cb, errorCb) => {
                        window.MHX.Services.getAppData().then(() => cb(window.MHX._DATA.portfolio))
                    })
                },

                /**
                 *
                 *
                 */
                getHomeData: ( cb, errorCb ) => {
                    return new Promise( (cb, errorCb) => {
                        window.MHX.Services.getAppData().then(() => cb(window.MHX._DATA.home))
                    })
                }
            },

            Util: {}
        }

        riot.mount("*")
    })(jQuery); // End of use strict
