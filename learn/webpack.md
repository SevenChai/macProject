# webpack
    ## 版本
        查看所有版本：npm view webpack versions
    ## context
        上下文的路径起点    
    ## loader
        1.解析css
        css-loader => style-loader: 将解析完的css以<style>插入到html中
        css-loader => MiniCssExtractPlugin.loader: 将解析完的css整合后以<link>插入到html中   
        2.解析图片
        url-loader: Image Inline，limit: 小于b的文件使用base64的方式插入到html中 => file-loader: 打包后的文件放到哪个文件夹中