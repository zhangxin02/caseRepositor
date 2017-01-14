var gulp = require('gulp')
less = require('gulp-less'),
    sass = require('gulp-sass'),
    connect = require("gulp-connect"),
    concat= require("gulp-concat"),
    uglify = require("gulp-uglify")
;


gulp.task("testLess", function () {
    gulp.src("src/less/index.less").pipe(less())
        .pipe(gulp.dest('src/css'));
    gulp.src("src/sass/*.scss").pipe(sass())
        .pipe(gulp.dest('src/css'));
});


gulp.task("copy", function () {
    gulp.src("index.html").pipe(gulp.dest("app"));
    gulp.src("src/css/*").pipe(gulp.dest("app/css"));
    gulp.src("image/*.{jpg,png}").pipe(gulp.dest("app/image"))
    gulp.src("image/**/*").pipe(gulp.dest("app/image"));
})

//gulp.task("copy",function(){
//    gulp.src(["index.html","src/css/*","image/**/*"])
//        .pipe(gulp.dest("app"))
//
//})

gulp.task("data", function () {
    gulp.src(["xml/*.xsl", "json/*.json", "!json/test.json"])
        .pipe(gulp.dest("app/data"))

});
gulp.task("server",function(){
    connect.server({
        root:"app",
        livereload:true
    })
});
gulp.task("watch", function () {
    gulp.watch(["src/less/*.less", "src/sass/*.scss"], ["testLess"]);
    gulp.watch(["index.html", "src/css/*",
        "image/*.{jpg,png}", "image/**/*"], ["copy"])
});

gulp.task("script",function(){
    gulp.src(["js/*.js"]).
        pipe(concat("cendor.js")).pipe(uglify()).
        pipe(gulp.dest("app/js"));
});

gulp.task('default', ['testLess', 'copy', 'data',"server","watch"]);
