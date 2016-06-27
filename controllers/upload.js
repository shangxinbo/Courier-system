'use strict';

var fs = require('fs');

exports.showtpl = function(req, res) {
    res.render('upload', {
        title: "上传文件"
    });
};
exports.submit = function(req, res) {

    console.log(req.file);
    if(req.files){ //multiple
        for(var i=0;i<req.files.length;i++){
            storage(req.files[i].originalname,req.files[i].path);
        }
    }else{                  //single
        storage(req.file.originalname,req.file.path);
    }
    res.end();
};

// 保存文件
function storage(name,path){
    fs.open(name, 'w', '0666', function (e, fd) {
        if (e) throw e;
        fs.readdir(path, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data.length);
            }
            fs.write(fd, data, function (e) {
                if (e) throw e;
                fs.closeSync(fd);
            });
        })
    });
}