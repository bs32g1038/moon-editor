const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

app.use('/static/', express.static(path.join(__dirname, '../upload')));

app.use(cors());

app.post('/upload', multer({ dest: '../upload' }).single('file'), function(req, res, next) {
    if (req.file.length === 0) {
        res.render('error', { message: '上传文件不能为空！' });
        return;
    } else {
        let file = req.file;
        let fileInfo = {};
        console.log(file);
        fs.renameSync('../upload/' + file.filename, '../upload/' + file.originalname); //这里修改文件名字，比较随意。
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        // 设置响应类型及编码
        res.set({
            'content-type': 'application/json; charset=utf-8',
        });

        res.json({
            src: 'http://127.0.0.1:3000/static/' + fileInfo.originalname,
        });
    }
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
