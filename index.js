import '@/assets/index.css'
import '@/assets/index.less'
import '@/assets/index.scss'
import {a, sayName} from '@/main'
sayName('seven')

import $ from 'jquery'
import cat from '@/assets/imgs/cat.jpg'
import dog from '@/assets/imgs/dog.jpg'
import cangshu from '@/assets/imgs2/dog.jpg'
$(function(){
    $('body').append('<ul><li>test</li></ul>')
    let lis = "";
    for(let i=0; i<5; i++){
        lis += `<li>${ 'test'+i }</li>`
    }
    $('ul').html(lis)
    $('body').append('<div class="cat">hello</div>')

    //file-loader后是chunk的文件名
    $('body').append('<img src='+ cat + ' />')
    
    //依然是cat.jpg,影响打包，最好是cdn的数据再使用这种方式
    //$('body').append('<img src="src/assets/imgs/cat.jpg"/>')

    $('body').append('<img src='+ dog + ' />')
    $('body').append('<img src='+ cangshu + ' />')
})


