var css = `html, body{
    display: flex;
    width: 100%;    
    height: 100%;
}

.preview-window{
    width: 50%;
    height: 1500;
    background-color: bisque;
}

.preview-window:hover, .preview-window *:hover{
    border: solid 2px red;
}

.panel{
    display: flex;
    width: 50%;
    padding: 5%;
}

.panel div{
    width: 100%;
}

.option-name{
    margin-right: 10%;
}
`;
var className = ""


window.addEventListener('load', function(){

    function parseCSSText(cssText) {
        // 去除註釋和多餘的空白字符
        var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
        var cssToJs = s => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
        var styleSheet = {};
    
        // 全局匹配每個 CSS 規則
        var rules = cssTxt.match(/ ?(.*?) ?{([^}]*)}/g);
        
        if (rules) {
            for (var rule of rules) {
                var [, ruleName, ruleBody] = rule.match(/ ?(.*?) ?{([^}]*)}/);
                var properties = ruleBody.split(";").map(o => o.split(":").map(x => x && x.trim()));
                var style = {};
                for (var [property, value] of properties) {
                    if (property && value) {
                        style[cssToJs(property)] = value;
                    }
                }
                styleSheet[ruleName.trim()] = style;
            }
        }
    
        return styleSheet;
    }
    
    // 測試範例
    const input = css;
    const result = parseCSSText(input);
    result['html, body']['display']='block';
    console.log(result);

    $('.preview-window, .preview-window *').on('click', function(e){
        e.stopImmediatePropagation();
        className = e.target.className
        $('.selected-class').text(e.target.className);

        var element = document.getElementsByClassName(e.target.className)[0];
        var element_css = window.getComputedStyle(element, null);
        console.log(element_css);

        // background-color
        var rgb = element_css.backgroundColor.replace(/([^0-9,])/g,'');
        $('.color-editor').val(rgbToHex(rgb));

        // opacity
        var opacity = element_css.opacity;
        $('.opacity-editor').val(opacity);
        

        //color
        var font_rgb = element_css.color.replace(/([^0-9,])/g,'');
        $('.font_color-editor').val(rgbToHex(font_rgb));

        //padding
        var padding = element_css.padding;
        console.log(splitString(padding));
        $('.padding-control').val(splitString(padding).numbers);

    })


})


function splitString(str) {
    const match = str.match(/^(\d+)(\D+)$/);
    if (match) {
        const numbers = match[1];
        const letters = match[2];
        return { numbers, letters };
    } else {
        return null;  // 如果輸入的字串不符合格式，返回null
    }
}


function rgbToHex(rgb_rgba){
    var a = 255;
    var rgb_arr = rgb_rgba.split(',');
    var result = "#";
    rgb_arr.forEach(element => {
        var hex = parseInt(element).toString(16);
        if(hex.length==1){
            hex = "0"+hex;
        }
        result += hex;
    });
    console.log(result);
    return result;
}

function change(e, field ){

    changeView(e, field, className);
    changeCss(e, field, className);
}

function changeWithUnit(e, field){
    var unit  = getUnit(e);
    var value = e.value;

    $('.'+className).css(field, value + unit);

}

function getUnit(e){
    var unit = $(e).parent().find('.unit').val();
    return unit;
}

function changeView(e, field, target){
    var color = e.value;
    $("."+target).css(field, color);
}


function changeCss(e, target){
    // var color = e.value;
    // $(target).css(field, color);
}