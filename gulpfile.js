var gulp   = require( 'gulp' ),
    server = require( 'gulp-develop-server' );

// run server
gulp.task( 'server:start', function() {
    server.listen( { path: './src/server.js' } );
});

// restart server if app.js changed
gulp.task( 'server:restart', function() {
    gulp.watch( [ './src/**/*.js' ], server.restart );
});

gulp.task('default',['server:start','server:restart']);