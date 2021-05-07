tinymce.init({
    selector: '#tinymce_comment',
    plugins: "codesample image imagetools charmap emoticons table toc wordcount paste",
    toolbar: "codesample image imagetools charmap emoticons table forecolor backcolor toc | subscript superscript",
    language: "zh_CN",          //设置语言为中文
    width:'100%',
    height:'100%',
    readonly : 0,
    nonbreaking_force_tab: true,     //设置可以使用Tab键缩进
    nonbreaking_force_tabvalue:'    ',
    paste_data_images: true, //粘贴data格式的图像
    paste_as_text: true,    //禁用复制外部格式,复制纯文本
    paste_enable_default_filters: true,  //开启默认过滤器
    //forced_root_block : 'div', //将文本的容器从默认的p标签更改为用div标签
    force_br_newlines : true,
    force_p_newlines : false,
    content_style: "p {margin: 0px; border:0px ; padding: 0px; font-family:'楷体'; font-size: 18px;}",  //设置编辑区域行间距和默认字体
    toolbar_sticky: true,
    branding: false,         //右下角“由TINY驱动”技术支持显示开关
    resize: false,       //右下角调整大小按钮开关
    placeholder: '在此发表一下评论吧...',     //编辑器内容为空时占位字符
    codesample_languages: [
        {text: 'HTML/XML', value: 'markup'},
        {text: 'JavaScript', value: 'javascript'},
        {text: 'CSS', value: 'css'},
        {text: 'PHP', value: 'php'},
        {text: 'Python', value: 'python'},
        {text: 'Java', value: 'java'},
        {text: 'C', value: 'c'},
        {text: 'C++', value: 'cpp'},
        {text: 'Verilog', value: 'verilog'},
        {text: 'VHDL', value: 'vhdl'},
        {text: 'C#', value: 'csharp'},
        {text: 'Matlab', value: 'matlab'},
        {text: 'SQL', value: 'sql'}
    ],
    codesample_content_css: '/static/css/prism.css', //设置代码容器为prism样式
    importcss_append: true,
    noneditable_noneditable_class: "mceNonEditable",
});