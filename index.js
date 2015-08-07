'use strict' ;

var fs = require( 'fs' ),
	gutil = require( 'gulp-util' ),
	through = require( 'through2' ),
	tv4 = require( 'tv4' ),
	PluginError = require( 'gulp-util' ).PluginError ;

// Constants
var PLUGIN_NAME = 'gulp-tv4' ;

function gulptv4( schema ) {

	// Ensure schema has been specified
	if ( !schema ) {
		throw new PluginError( PLUGIN_NAME, 'Missing schema' ) ;
	}
	// Read schema file if required
	if ( typeof schema === 'string' ) {
		var schemaDefinition = JSON.parse( fs.readFileSync( schema, 'utf-8' ) ) ;
	} else {
		var schemaDefinition = schema ;
	}

	// Create stream through which each input file will pass
	return through.obj( function( file, enc, callback ) {

		// Ignore directories and empty files
		if ( file.isNull() || file.isDirectory() ) {
			return callback( null, file ) ;
		}

		// Streams are not supported
		if ( file.isStream() ) {
			this.emit( 'error', new PluginError( {
				plugin: PLUGIN_NAME,
				message: 'Stream input type not supported'
			} ) ) ;
			return callback() ;
		}

		// Validate file
		if ( file.isBuffer() ) {
			// Convert file contents to JSON and validate
			var validationResult = tv4.validateResult( JSON.parse( file.contents ), schemaDefinition ) ;
			// Add validation results to file object
			file.tv4 = validationResult ;
			return callback( null, file ) ;
		}

	} ) ;
}

// Export main plugin function
module.exports = gulptv4 ;
