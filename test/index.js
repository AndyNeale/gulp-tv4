var assert = require( 'chai' ).assert,
	fs = require( 'fs' ),
	gutil = require( 'gulp-util' ),
	tv4 = require( '../index.js' ) ;

describe( 'gulp-tv4', function() {

	it( 'should pass a valid file when called with a JSON schema definition', function( done ) {

		var fakeFile = new gutil.File( {
			path: './test/files/valid-1.json',
			cwd: './test/',
			base: './test/files/',
			contents: fs.readFileSync( './test/files/valid-1.json' )
		} ) ;

		var fakeSchema = JSON.parse( fs.readFileSync( './test/files/schema.json', 'utf-8' ) ) ;

		var stream = tv4( fakeSchema ) ;
		stream.on( 'data', function( newFile ) {
			assert.isDefined( newFile, 'newFile is missing' ) ;
			assert.isDefined( newFile.tv4, "newFile.tv4 is missing" ) ;
			assert.isDefined( newFile.tv4.valid, "newFile.tv4.valid is missing" ) ;
			assert.isBoolean( newFile.tv4.valid, "newFile.tv4.valid is not a Boolean value" ) ;
			assert.isNull( newFile.tv4.error, "newFile.tv4.error should be null" ) ;
			assert.isDefined( newFile.tv4.missing, "newFile.tv4.missing is, ironically, missing" ) ;
			assert.isArray( newFile.tv4.missing, "newFile.tv4.missing is not an array" ) ;
			assert.equal( newFile.tv4.missing.length, 0, "newFile.tv4.missing should be zero-length" ) ;
			assert.isTrue( newFile.tv4.valid, "newFile.tv4.valid was expected to be true" ) ;
		} ) ;

		stream.once( 'end', function() {
			done() ;
		} ) ;

		// Pass fake input
		stream.write( fakeFile ) ;
		stream.end() ;

	} ) ;

	it( 'should pass a valid file when called with a schema filename', function( done ) {

		var fakeFile = new gutil.File( {
			path: './test/files/valid-1.json',
			cwd: './test/',
			base: './test/files/',
			contents: fs.readFileSync( './test/files/valid-1.json' )
		} ) ;

		var fakeSchema = './test/files/schema.json' ;

		var stream = tv4( fakeSchema ) ;
		stream.on( 'data', function( newFile ) {
			assert.isDefined( newFile, 'newFile is missing' ) ;
			assert.isDefined( newFile.tv4, "newFile.tv4 is missing" ) ;
			assert.isDefined( newFile.tv4.valid, "newFile.tv4.valid is missing" ) ;
			assert.isBoolean( newFile.tv4.valid, "newFile.tv4.valid is not a Boolean value" ) ;
			assert.isNull( newFile.tv4.error, "newFile.tv4.error should be null" ) ;
			assert.isDefined( newFile.tv4.missing, "newFile.tv4.missing is, ironically, missing" ) ;
			assert.isArray( newFile.tv4.missing, "newFile.tv4.missing is not an array" ) ;
			assert.equal( newFile.tv4.missing.length, 0, "newFile.tv4.missing should be zero-length" ) ;
			assert.isTrue( newFile.tv4.valid, "newFile.tv4.valid was expected to be true" ) ;
		} ) ;

		stream.once( 'end', function() {
			done() ;
		} ) ;

		// Pass fake input
		stream.write( fakeFile ) ;
		stream.end() ;

	} ) ;

	it( 'should fail a file with an invalid data type', function( done ) {

		var fakeFile = new gutil.File( {
			path: './test/files/invalid-1.json',
			cwd: './test/',
			base: './test/files/',
			contents: fs.readFileSync( './test/files/invalid-1.json' )
		} ) ;

		var fakeSchema = JSON.parse( fs.readFileSync( './test/files/schema.json', 'utf-8' ) ) ;

		var stream = tv4( fakeSchema ) ;
		stream.on( 'data', function( newFile ) {
			assert.isDefined( newFile, 'newFile is missing' ) ;
			assert.isDefined( newFile.tv4, "newFile.tv4 is missing" ) ;
			assert.isDefined( newFile.tv4.valid, "newFile.tv4.valid is missing" ) ;
			assert.isBoolean( newFile.tv4.valid, "newFile.tv4.valid is not a Boolean value" ) ;
			assert.isNotNull( newFile.tv4.error, "newFile.tv4.error should not be null" ) ;
			assert.isDefined( newFile.tv4.error.message, "newFile.tv4.error.message is missing" ) ;
			assert.equal( newFile.tv4.error.message, "Invalid type: string (expected number)", "newFile.tv4.error.message is incorrect" ) ;
			assert.isDefined( newFile.tv4.missing, "newFile.tv4.missing is, ironically, missing" ) ;
			assert.isArray( newFile.tv4.missing, "newFile.tv4.missing is not an array" ) ;
			assert.equal( newFile.tv4.missing.length, 0, "newFile.tv4.missing should be zero-length" ) ;
			assert.isFalse( newFile.tv4.valid, "newFile.tv4.valid was expected to be false" ) ;
		} ) ;

		stream.once( 'end', function() {
			done() ;
		} ) ;

		// Pass fake input
		stream.write( fakeFile ) ;
		stream.end() ;

	} ) ;

	it( 'should fail a file with a missing field', function( done ) {

		var fakeFile = new gutil.File( {
			path: './test/files/invalid-2.json',
			cwd: './test/',
			base: './test/files/',
			contents: fs.readFileSync( './test/files/invalid-2.json' )
		} ) ;

		var fakeSchema = JSON.parse( fs.readFileSync( './test/files/schema.json', 'utf-8' ) ) ;

		var stream = tv4( fakeSchema ) ;
		stream.on( 'data', function( newFile ) {
			assert.isDefined( newFile, 'newFile is missing' ) ;
			assert.isDefined( newFile.tv4, "newFile.tv4 is missing" ) ;
			assert.isDefined( newFile.tv4.valid, "newFile.tv4.valid is missing" ) ;
			assert.isBoolean( newFile.tv4.valid, "newFile.tv4.valid is not a Boolean value" ) ;
			assert.isNotNull( newFile.tv4.error, "newFile.tv4.error should not be null" ) ;
			assert.isDefined( newFile.tv4.error.message, "newFile.tv4.error.message is missing" ) ;
			assert.equal( newFile.tv4.error.message, "Missing required property: db_port", "newFile.tv4.error.message is incorrect" ) ;
			assert.isDefined( newFile.tv4.missing, "newFile.tv4.missing is, ironically, missing" ) ;
			assert.isArray( newFile.tv4.missing, "newFile.tv4.missing is not an array" ) ;
			assert.equal( newFile.tv4.missing.length, 0, "newFile.tv4.missing should be zero-length" ) ;
			assert.isFalse( newFile.tv4.valid, "newFile.tv4.valid was expected to be false" ) ;
		} ) ;

		stream.once( 'end', function() {
			done() ;
		} ) ;

		// Pass fake input
		stream.write( fakeFile ) ;
		stream.end() ;

	} ) ;

} ) ;
