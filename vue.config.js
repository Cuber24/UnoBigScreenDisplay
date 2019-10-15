const path = require('path')
const productionGzipExtensions = ['js', 'css','jpg','png']
const deployEnvir = ['localhost','github','aliyun_kang'][2]

let deploypath

if(deployEnvir == 'localhost'){
    deploypath = '/'
}else if(deployEnvir == 'github'){
    deploypath = '/dist_uno'  // github repository name
}else if(deployEnvir == 'aliyun_kang'){
    deploypath = '/uno'  // kang server site
}


module.exports = {

    // publicPath : process.env.NODE_ENV === 'production' ? '/visitors' : '/' ,
    publicPath : deploypath ,
    productionSourceMap : false,


}