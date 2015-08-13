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
		assert.true( typeof newFile != 'undefined', 'newFile is present' ) ;
		assert.true( typeof newFile.tv4 != 'undefined', 'newFile.tv4 is present' ) ;
		assert.true( typeof newFile.tv4.valid != 'undefined', 'newFile.tv4.valid is present' ) ;
		assert.true( typeof newFile.tv4.valid == 'boolean', 'newFile.tv4.valid is boolean' ) ;
		assert.equal( newFile.tv4.error, null, 'newFile.tv4.error is null' ) ;
		assert.true( typeof newFile.tv4.missing != 'undefined', 'newFile.tv4.missing is present' ) ;
		assert.true( typeof newFile.tv4.missing.length != 'undefined', 'newFile.tv4.missing is an array' ) ;
		assert.equal( newFile.tv4.missing.length, 0, 'newFile.tv4.missing is empty' ) ;
		assert.true( newFile.tv4.valid, 'newFile.tv4.valid is true' ) ;
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
		assert.true( typeof newFile != 'undefined', 'newFile is present' ) ;
		assert.true( typeof newFile.tv4 != 'undefined', 'newFile.tv4 is present' ) ;
		assert.true( typeof newFile.tv4.valid != 'undefined', 'newFile.tv4.valid is present' ) ;
		assert.true( typeof newFile.tv4.valid == 'boolean', 'newFile.tv4.valid is boolean' ) ;
		assert.equal( newFile.tv4.error, null, 'newFile.tv4.error is null' ) ;
		assert.true( typeof newFile.tv4.missing != 'undefined', 'newFile.tv4.missing is present' ) ;
		assert.true( typeof newFile.tv4.missing.length != 'undefined', 'newFile.tv4.missing is an array' ) ;
		assert.equal( newFile.tv4.missing.length, 0, 'newFile.tv4.missing is empty' ) ;
		assert.true( newFile.tv4.valid, 'newFile.tv4.valid is true' ) ;
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
		assert.true( typeof newFile != 'undefined', 'newFile is present' ) ;
		assert.true( typeof newFile.tv4 != 'undefined', 'newFile.tv4 is present' ) ;
		assert.true( typeof newFile.tv4.valid != 'undefined', 'newFile.tv4.valid is present' ) ;
		assert.true( typeof newFile.tv4.valid == 'boolean', 'newFile.tv4.valid is boolean' ) ;
		assert.notEqual( newFile.tv4.error, null, 'newFile.tv4.error is not null' ) ;
		assert.true( newFile.tv4.error.message != 'undefined', 'newFile.tv4.error.message is present' ) ;
		assert.equal( newFile.tv4.error.message, 'Invalid type: string (expected number)', 'newFile.tv4.error.message is correct' ) ;
		assert.true( typeof newFile.tv4.missing != 'undefined', 'newFile.tv4.missing is present' ) ;
		assert.true( typeof newFile.tv4.missing.length != 'undefined', 'newFile.tv4.missing is an array' ) ;
		assert.equal( newFile.tv4.missing.length, 0, 'newFile.tv4.missing is empty' ) ;
		assert.false( newFile.tv4.valid, 'newFile.tv4.valid is false' ) ;
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
		assert.true( typeof newFile != 'undefined', 'newFile is present' ) ;
		assert.true( typeof newFile.tv4 != 'undefined', 'newFile.tv4 is present' ) ;
		assert.true( typeof newFile.tv4.valid != 'undefined', 'newFile.tv4.valid is present' ) ;
		assert.true( typeof newFile.tv4.valid == 'boolean', 'newFile.tv4.valid is boolean' ) ;
		assert.notEqual( newFile.tv4.error, null, 'newFile.tv4.error is not null' ) ;
		assert.true( newFile.tv4.error.message != 'undefined', 'newFile.tv4.error.message is present' ) ;
		assert.equal( newFile.tv4.error.message, 'Missing required property: db_port', 'newFile.tv4.error.message is correct' ) ;
		assert.true( typeof newFile.tv4.missing != 'undefined', 'newFile.tv4.missing is present' ) ;
		assert.true( typeof newFile.tv4.missing.length != 'undefined', 'newFile.tv4.missing is an array' ) ;
		assert.equal( newFile.tv4.missing.length, 0, 'newFile.tv4.missing is empty' ) ;
		assert.false( newFile.tv4.valid, 'newFile.tv4.valid is false' ) ;
	} ) ;

	stream.once( 'end', function() {
		assert.end() ;
	} ) ;

	// Pass fake input
	stream.write( fakeFile ) ;
	stream.end() ;

} ) ;
