# webpack
    ## 版本
        查看所有版本：npm view webpack versions
    ## context
        上下文的路径起点   
    ## filename []
        https://webpack.docschina.org/configuration/output/#outputfilename     
    ## loader
        1.解析css
        css-loader => style-loader: 将解析完的css以<style>插入到html中
        css-loader => MiniCssExtractPlugin.loader: 将解析完的css整合到一起后以<link>插入到html中  
            css-loader: 
                解析import，require，url这些，将css解析成js模块
                bg-img: url("")，alias对应图片位置[https://webpack.docschina.org/loaders/css-loader/] 
                css加载顺序：index.js中.css,.vue加载顺序
            MiniCssExtractPlugin:
                将所有相关css打包成一个common.css并插入到html的header中
                ？无效，publicPath 将css中的文件[font, image]等打包到某一路径下（应该是因为还添加了url-loader）


        2.解析图片
        url-loader: Image Inline，limit: 小于b的文件使用base64的方式插入到html中 => file-loader: 打包后的文件放到哪个文件夹中