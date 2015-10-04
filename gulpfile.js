var gulp = require("gulp"),
	cfg = require("./config"),

	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	order = require("gulp-order"),

	compileLess = require("gulp-less"),
	autoprefixer = require("gulp-autoprefixer"),
	minifyCSS = require("gulp-minify-css"),
	concatCSS = require("gulp-concat-css"),

	source = require("vinyl-source-stream"),
	browserify = require("browserify"),
	babelify = require("babelify"),
	glob = require("glob"),

	imagemin = require("gulp-imagemin"),
	pngquant = require("imagemin-pngquant");


gulp.task("js", function(){
	var files = glob.sync("assets/js/app/*.js"),
		browserifed, fileName;

	files.map(function(entryFile){

		fileName = entryFile.match(/\w+(?=\.js)/gi);
		browserifed = browserify({ entries: [entryFile], debug: true });
		
		browserifed
			.transform(babelify)
			.bundle()
			.pipe(source(fileName + ".js"))
			.pipe(rename({ extname: ".bundle.min.js" }))
			.pipe(gulp.dest("./build/js"))
			.pipe(notify({ message: "js done", onLast: true }));

		return browserifed;
	});
});

gulp.task("fonts", function(){

	gulp.src(cfg.fontPath + "**/*.*")
		.pipe(gulp.dest(cfg.buildPath + "fonts"))
		.pipe(notify({message: "fonts done", onLast: true}));
});

gulp.task("css", function(){

	var fileList = [
			"auth.less",
			"staff.less"
		],
		scrollCssPath = "node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css",
		nameExtractor = /[A-Za-z]+(?=\.less)/,
		tasks, match, fileName;

	tasks = fileList.map(function(entry){
		
		match = entry.match(nameExtractor);
		if(!match) return;
		fileName = match[0];

		return gulp.src([
				cfg.cssPath + "reset.less",
				scrollCssPath,
				cfg.cssPath + "common.less",
				cfg.cssPath + fileName + ".less"
			])
			.pipe(compileLess())
			.pipe(concatCSS(fileName + ".bundle.css"))
			.pipe(autoprefixer({
				configbrowsers: ["last 4 versions"],
				cascade: true,
				remove: true,
				add: true
			}))
			.pipe(minifyCSS({processImport: false}))
			.pipe(rename({extname: ".min.css"}))
			.pipe(gulp.dest(cfg.buildPath + "css"))
			.pipe(notify({message: "css done", onLast: true}));
	});

});

gulp.task("images", function(){

	gulp.src(cfg.imagePath + "**/*.*")
		.pipe(imagemin({
			optimizationLevel: 4,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [ pngquant() ]
		}))
		.pipe(gulp.dest(cfg.buildPath + "images"));
});

gulp.task("watcher", function(){
	gulp.watch(cfg.jsPath + "**/*.js", ["js"]);
	gulp.watch(cfg.cssPath + "**/*.less", ["css"]);
	gulp.watch(cfg.imagePath + "**/*.*", ["images"]);
});

gulp.task("default", ["js", "fonts", "css", "images", "watcher"]);