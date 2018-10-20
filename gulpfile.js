'use strict';

let pkg = require('./package.json');

const
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	webpack = require('webpack-stream'),
	bs = require('browser-sync'),
	named = require('vinyl-named'),
	cleanCSS = require('gulp-clean-css'),
	HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const paths = {
	scripts: 'js/**/*.js',
	webpack: 'js/*.js',
	style: 'css/*.css',
	html: '*.html',

	dest: {
		default: 'build'
	}
};

const getPath = source => {

	return [paths[source]];
};


gulp.task('scripts', () => {
	return gulp.src(getPath('webpack'))
		.pipe($.plumber())
		.pipe(named())
		.pipe(webpack({
			output: {
				filename: '[name].js'
			},
			resolve: {
				modules: ['js', 'node_modules']
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						use: {
							loader: 'babel-loader?cacheDirectory',
							options: {
								presets: ['@babel/preset-env'],
								plugins: ['@babel/plugin-proposal-object-rest-spread']
							}
						}
					}
				]
			},
			mode: $.util.env.production ? 'production' : 'development',
			optimization: {
				minimize: $.util.env.production ? true : false,
			},
			plugins: [
				new webpack.webpack.DefinePlugin({
					VERSION: JSON.stringify(pkg.version)
				}),
				new webpack.webpack.BannerPlugin('Build Version: ' + pkg.version),
				$.util.env.production ? $.util.noop : new HardSourceWebpackPlugin()
			],
			devtool: $.util.env.production ? '' : 'eval-source-map'
		}))
		.pipe(gulp.dest(paths.dest.default));
});



gulp.task('clean', () => {

	return del.sync('build');
});


gulp.task('server', ['watch'], () => {

	bs({
		files: ['build/**', '!build/**/*.map'],
		server: {
			baseDir: ['build', './']
		},
		open: !$.util.env.no
	});

});

gulp.task('style', function () {
	return gulp.src(paths.style)
		.pipe($.util.env.production ? cleanCSS({ compatibility: 'ie8' }) : $.util.noop())
		.pipe(gulp.dest(paths.dest.default));
});


gulp.task('html', function () {
	return gulp.src(paths.html)
		.pipe(gulp.dest(paths.dest.default));
});

gulp.task('watch', ['scripts', 'style', 'html'], () => {

	gulp.watch(getPath('scripts'), ['scripts']);
	gulp.watch(getPath('style'), ['style']);
	gulp.watch(getPath('html'), ['html']);
});

gulp.task('default', ['clean'], () => {

	gulp.start('server');
});

