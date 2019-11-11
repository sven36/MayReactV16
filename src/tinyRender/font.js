var Fontmin = require('fontmin');

var fontmin = new Fontmin()
    .src('./src/tinyRender/icomoon.woff')
    // .use(Fontmin.glyph({
    //     text: '2门',
    //     use: (ttf, subset) => {
    //         let indexList = ttf.findGlyf({
    //             unicode: subset || []
    //         });
    //         ttf.setGlyf(ttf.adjustGlyf(indexList, { scale: 0.5 }));
    //     }
    // }))
    .use(Fontmin.woff2ttf())
    .dest('./src/tinyRender/del')
    .run(() => {
        console.log('done');
    });

    // text: '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ后右左侧内前柱板门车外座饰动椅边裙子翼灯电箱部排轮顶架驾备驶以骨检窗防区胎域器水损机异向梁失全查震',

    // .use(Fontmin.ttf2eot())     // eot 转换插件
    // .use(Fontmin.ttf2woff())    // woff 转换插件     
    // .use(Fontmin.ttf2svg()) 