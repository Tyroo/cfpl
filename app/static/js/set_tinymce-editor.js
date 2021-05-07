tinymce.init({
    selector: '#tinymce_content',
    plugins: 'print preview paste importcss searchreplace autolink autosave directionality visualblocks visualchars fullscreen  link image media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons toc',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | image imagetools media template link anchor codesample | ltr rtl | toc',
    toolbar_sticky: true,
    images_upload_url: 'editor/',
    images_upload_base_path: 'http://127.0.0.1:8000/editor',
    media_live_embeds: true,
    autosave_ask_before_unload: false,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    branding: false,    // 关闭底部官网提示 默认true
    resize: false,  // 调节编辑器大小 默认 true
    placeholder: '在此发表你的文章吧...',
    force_br_newlines : true,
    force_p_newlines : false,
    tabfocus_elements: '#tinymce_content',
    nonbreaking_force_tab: true,     //设置可以使用Tab键缩进
    width:'100%',
    height:'100%',
    language: "zh_CN",          //设置语言为中文
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
    codesample_content_css: '/static/css/prism.css',   //设置代码容器为prism样式
    // content_css: '//www.tiny.cloud/css/codepen.min.css',
//    link_list: [
//        { title: 'My page 1', value: 'http://www.tinymce.com' },
//        { title: 'My page 2', value: 'http://www.moxiecode.com' }
//    ],
//    image_list: [
//        { title: 'My page 1', value: 'http://www.tinymce.com' },
//        { title: 'My page 2', value: 'http://www.moxiecode.com' }
//    ],
//    image_class_list: [
//        { title: 'None', value: '' },
//        { title: 'Some class', value: 'class-name' }
//    ],
    importcss_append: true,
    file_picker_callback: function (callback, value, meta) {
        /* Provide file and text for the link dialog */
        if (meta.filetype === 'file') {
            callback('', { text: 'My text' });
        }

        /* Provide image and alt text for the image dialog */
        if (meta.filetype === 'image') {
             callback('', { alt: 'My alt text' });
         }

        /* Provide alternative source and posted for the media dialog */
        if (meta.filetype === 'media') {
            callback('', {alt: 'My alt media',type:'jpg'});
        }
    },
    templates: [
        { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
        { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
        { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
//    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: 'sliding',
    contextmenu: "link image imagetools media table",
    content_style: "p {margin: 0px; border:0px ; padding: 0px; font-family:'宋体'; font-size: 18px;}",
    /*修改字体*/
    font_formats: "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings"

});
