# gulp-tv4

> Use Gulp and [Tiny Validator (tv4)](https://github/com/geraintluff/tv4) to validate files against [json-schema](https://json-schema.org/) draft v4.


# Usage

Install [Gulp](https://gulpjs.com) globally and locally ([read an explanation of why we need to do both here](http://blog.dwaynecrooks.com/post/110903139442/why-do-we-need-to-install-gulp-globally-and)):

```shell
$ npm install gulp -g
$ npm install gulp --save-dev
```

Install the plugin as follows:

```shell
$ npm install gulp-tv4 --save-dev
```

The plugin can then be enabled inside your Gulpfile:

```js
var gulp = require( 'gulp' ),
    tv4 = require( 'gulp-tv4' ) ;
```

And can be used as follows:

```js
gulp.task( 'validate', function() {
  gulp.src( 'config.json' )
    .pipe( tv4( 'schema.json' ) ) ;
} ) ;
```


## Parameters

The plugin expects to be called with either the name of a file containing the schema against which all input files should be validated, or with an object containing the schema definition.

In other words, either of the following will work:

#### Pass the name of the schema file

```js
gulp.task( 'validate', function() {
  gulp.src( 'config.json' )
    .pipe( tv4( 'schema.json' ) ) ;
} ) ;
```

#### Pass the schema definition as an object

```js
var schema = {
  "title": "User Schema",
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "minLength": 10
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "maxLength": 12
    }
  },
  "required": [
    "username", "password"
  ]
} ;
gulp.task( 'validate', function() {
  gulp.src( 'config.json' )
    .pipe( tv4( schema ) ) ;
} ) ;
```


## Reporting

Validation results are added onto each file object under the tv4 key, and contain the following elements:

* valid - Boolean
* error - object containing error details (if any)
* missing - array of missing schema(s) (if any)

So a more thorough example which checks the validation results might look like:

```js
gulp.task( 'validate', function() {
  gulp.src( [ '*.json' ] )
    .pipe( tv4( 'schema.json' ) )
    .pipe( through.obj( function( file, enc, callback ) {
      callback( null, file ) ;
      if ( !file.tv4.valid ) {
        throw new Error( 'JSON validation error(s) found' ) ;
      }
    } ) ) ;
} ) ;
```


# History

* 0.1.0 - First release


# Todo

* Currently the way that validation errors are reported is a mess, this is entirely due to lack of experience (this is my first attempt at writing a Gulp plugin) so to say that there is some work to be done here is something of an understatement...


# License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)