const express = require('./express');
const app = express();
// app.get('/index', (req, res) => {
//     res.end('/index');
// });
// match /indexab /indeab 
app.use((req,res,next) => {
    console.log('use-0');
    next();
})
app.use('/next', (req, res, next) => {
    //  res.end('use-next')
    console.log('use-1');
    next();
});
app.get('/next',
    (req, res, next) => {
        console.log('1-1'); next()
    },
    (req, res, next) => {
        console.log('1-2');
        setTimeout(() => {
            next()
        }, 1000);
    },
    (req, res, next) => {
        console.log('1-3');
        next()
    },
);

app.get('/next',
    (req, res, next) => {
        console.log('1');
        setTimeout(() => {
            next();
        }, 1000);
    });
app.get('/next',
    (req, res, next) => {
        console.log('2');
        next();
    })
app.get('/next',
    (req, res, next) => {
        console.log('3');
        res.end('/next3');
    });
// app.get('/', (req, res) => {
//     res.end('/');
// });
app.get('/index?ab', (req, res) => {
    res.end('/index?ab');
});
app.get('/ab*ab', (req, res) => {
    res.end('/ab*ab');
});

app.get('/about/:about/books/:books', (req, res) => {
    res.end(JSON.stringify(req.params));
});

app.post('/post', (req, res) => {
    res.end('/post');
})
app.delete('/delete', (req, res) => {
    res.end('/delete');
})
console.log(app._router.routers);
// 不验证 请求方法与路径
// app.use(() => {

// });
// 匹配 /foo /foo/a/b /foo/a
app.listen(9091, () => {
    console.log('服务启动了: http://localhost:9091');
})


