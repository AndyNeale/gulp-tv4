var fs = require( 'fs' ),
	gutil = require( 'gulp-util' ),
	test = require( 'tape' ),
	tv4 = require( '../index.js' ) ;

test( 'Pass a valid file when called with a JSON schema definition', function( assert ) {

	var fakeFile = new gutil.File( {
		path: './test/files/valid-1.json',
		cwd: './test/',
		base: './test/files/',
		contents: fs.readFileSync( './test/files/valid-1.json' )
	} ) ;

	var fakeSchema = JSON.parse( fs.readFileSync( './test/files/schema.json', 'utf-8' ) ) ;

	var stream = tv4( fakeSchema ) ;
	stream.on( 'data', function( newFile ) {
		assert.notEqual( typeof newFile, 'undefined', 'newFile is present' ) ;
		assert.notEqual( typeof newFile.tv4, 'undefined', 'newFile.tv4 is present' ) ;
		assert.notEqual( typeof newFile.tv4.valid, 'undefined', 'newFile.tv4.valid is present' ) ;
		assert.equal( typeof newFile.tv4.valid, 'boolean', 'newFile.tv4.valid is a Boolean value' ) ;
		assert.equal( newFile.tv4.error, null, 'newFile.tv4.error is null' ) ;
		assert.notEqual( typeof newFile.tv4.missing, 'undefined', 'newFile.tv4.missing is present' ) ;
		assert.notEqual( typeof newFile.tv4.missing.length, 'newFile.tv4.missing is an array' ) ;
		assert.equal( newFile.tv4.missing.length, 0, 'newFile.tv4.missing should not be zero-length' ) ;
		assert.ok( newFile.tv4.valid, 'newFile.tv4.valid is true' ) ;
	} ) ;

	stream.once( 'end', function() {
		assert.end() ;
	} ) ;

	// Pass fake input
	stream.write( fakeFile ) ;
	stream.end() ;

} ) ;

test( 'Pass a valid file when called with a schema filename', function( assert ) {

	var fakeFile = new gutil.File( {
		path: './test/files/valid-1.json',
		cwd: './test/',
		base: './test/files/',
		contents: fs.readFileSync( './test/files/valid-1.json' )
	} ) ;

	var fakeSchema = './test/files/schema.json' ;

	var stream = tv4( fakeSchema ) ;
	stream.on( 'data', function( newFile ) {
		assert.notEqual( newFile, 'undefined', 'newFile is present' ) ;
		assert.notEqual( newFile.tv4, 'undefined', 'newFile.tv4 is present' ) ;
		assert.notEqual( newFile.tv4.valid, 'undefined', 'newFile.tv4.valid is present' ) ;
		assert.equal( typeof newFile.tv4.valid, 'boolean', 'newFile.tv4.valid is a Boolean value' ) ;
		assert.equal( newFile.tv4.error, null, 'newFile.tv4.error is null' ) ;
		assert.notEqual( newFile.tv4.missing, 'undefined', 'newFile.tv4.missing is present' ) ;
		assert.notEqual( newFile.tv4.missing.length, 'undefined', 'newFile.tv4.missing is an array' ) ;
		assert.equal( newFile.tv4.missing.length, 0, 'newFile.tv4.missing is zero-length' ) ;
		assert.ok( newFile.tv4.valid, 'newFile.tv4.valid is true' ) ;
	} ) ;

	stream.once( 'end', function() {
		assert.end() ;
	} ) ;

	// Pass fake input
	stream.write( fakeFile ) ;
	stream.end() ;

} ) ;

test( 'Fail a file with an invalid data type', function( assert ) {

	var fakeFile = new gutil.File( {
		path: './test/files/invalid-1.json',
		cwd: './test/',
		base: './test/files/',
		contents: fs.readFileSync( './test/files/invalid-1.json' )
	} ) ;

	var fakeSchema = JSON.parse( fs.readFileSync( './test/files/schema.json', 'utf-8' ) ) ;

	var stream = tv4( fakeSchema ) ;
	stream.on( 'data', function( newFile ) {
		assert.notEqual( newFile, 'undefined', 'newFile is present' ) ;
		assert.notEqual( newFile.tv4, 'undefined', 'newFile.tv4 is present' ) ;
		assert.notEqual( newFile.tv4.valid, 'undefined', 'newFile.tv4.valid is present' ) ;
		assert.equal( typeof newFile.tv4.valid, 'boolean', 'newFile.tv4.valid is a Boolean value' ) ;
		assert.notEqual( typeof newFile.tv4.error, 'null', 'newFile.tv4.error is not null' ) ;
		assert.notEqual( newFile.tv4.error.message, 'undefined', 'newFile.tv4.error.message is present' ) ;
		assert.equal( newFile.tv4.error.message, 'Invalid type: string (expected number)', 'newFile.tv4.error.message is correct' ) ;
		assert.notEqual( newFile.tv4.missing, 'undefined', 'newFile.tv4.missing is present' ) ;
		assert.notEqual( newFile.tv4.missing.length, 'undefined', 'newFile.tv4.missing is an array' ) ;
		assert.equal( newFile.tv4.missing.length, 0, 'newFile.tv4.missing is zero-length' ) ;
		assert.notOk( newFile.tv4.valid, 'newFile.tv4.valid is false' ) ;
	} ) ;

	stream.once( 'end', function() {
		assert.end() ;
	} ) ;

	// Pass fake input
	stream.write( fakeFile ) ;
	stream.end() ;

} ) ;

test( 'Fail a file with a missing field', function( assert ) {

	var fakeFile = new gutil.File( {
		path: './test/files/invalid-2.json',
		cwd: './test/',
		base: './test/files/',
		contents: fs.readFileSync( './test/files/invalid-2.json' )
	} ) ;

	var fakeSchema = JSON.parse( fs.readFileSync( './test/files/schema.json', 'utf-8' ) ) ;

	var stream = tv4( fakeSchema ) ;
	stream.on( 'data', function( newFile ) {
		assert.notEqual( newFile, 'undefined', 'newFile is present' ) ;
		assert.notEqual( newFile.tv4, 'undefined', 'newFile.tv4 is present' ) ;
		assert.notEqual( newFile.tv4.valid, 'undefined', 'newFile.tv4.valid is present' ) ;
		assert.equal( typeof newFile.tv4.valid, 'boolean', 'newFile.tv4.valid is a Boolean value' ) ;
		assert.notEqual( typeof newFile.tv4.error, 'null', 'newFile.tv4.error is not null' ) ;
		assert.notEqual( newFile.tv4.error.message, 'undefined', 'newFile.tv4.error.message is present' ) ;
		assert.equal( newFile.tv4.error.message, 'Missing required property: db_port', 'newFile.tv4.error.message is correct' ) ;
		assert.notEqual( newFile.tv4.missing, 'undefined', 'newFile.tv4.missing is present' ) ;
		assert.notEqual( newFile.tv4.missing.length, 'undefined', 'newFile.tv4.missing is an array' ) ;
		assert.equal( newFile.tv4.missing.length, 0, 'newFile.tv4.missing should be zero-length' ) ;
		assert.notOk( newFile.tv4.valid, 'newFile.tv4.valid is false' ) ;
	} ) ;

	stream.once( 'end', function() {
		assert.end() ;
	} ) ;

	// Pass fake input
	stream.write( fakeFile ) ;
	stream.end() ;

} ) ;
