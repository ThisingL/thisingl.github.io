/* 站点运行时间 */
function runtime() {
	window.setTimeout("runtime()", 1000);
	/* 请修把这里的建站时间换为你自己的 */
    let startTime = new Date('06/24/2025 11:22:37');
    let endTime = new Date();
    let usedTime = endTime - startTime;
    let days = Math.floor(usedTime / (24 * 3600 * 1000));
    let leavel = usedTime % (24 * 3600 * 1000);
    let hours = Math.floor(leavel / (3600 * 1000));
    let leavel2 = leavel % (3600 * 1000);
    let minutes = Math.floor(leavel2 / (60 * 1000));
    let leavel3 = leavel2 % (60 * 1000);
    let seconds = Math.floor(leavel3 / (1000));
    let runbox = document.getElementById('run-time');
    runbox.innerHTML = '本站已安全运行 <i class="far fa-clock fa-fw"></i> '
        + ((days < 10) ? '0' : '') + days + ' 天 '
        + ((hours < 10) ? '0' : '') + hours + ' 时 '
        + ((minutes < 10) ? '0' : '') + minutes + ' 分 '
        + ((seconds < 10) ? '0' : '') + seconds + ' 秒 ';
}
runtime();

/* 背景图片预加载 - LQIP 方案 */
(function() {
	var hdBg = new Image();
	hdBg.src = '/images/13MB-background.jpg';
	hdBg.onload = function() {
		document.body.classList.add('bg-loaded');
	};
})();


/* 返回随机颜色 */
function randomColor() {
	return "rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")";
}

/* 点击生成字符特效 */
var a_idx = 0;
var a_click = 1;
  /* 生成的字符内容 */
var a = new Array("乀(ˉεˉ乀)","𓂃𓂃𓂃𓊝𓄹𓄺𓂃𓂃𓂃","˘ᗜ˘","(╥╯^╰╥)","╰(*´︶`*)╯","✧(◍˃̶ᗜ˂̶◍)✩","｡◕‿◕｡",
"(๑ت๑)","(๑❛ᴗ❛๑)","w(ﾟДﾟ)w","Σ( ° △ °|||)︴","(⊙ˍ⊙)","(๑ˉ∀ˉ๑)","<(￣︶￣)>","╰(*°▽°*)╯","✿",
"(,,•́ . •̀,,)","վ'ᴗ' ի","(◔◡◔)","⚝","₍ᐢ. ֑ .ᐢ₎");
jQuery(document).ready(function($) {
    $("body").click(function(e) {
		/* 点击频率，点击几次就换文字 */
		var frequency = 2;
		if (a_click % frequency === 0) {
			
			var $i = $("<span/>").text(a[a_idx]);
			a_idx = (a_idx + 1) % a.length;
			var x = e.pageX,
			y = e.pageY;
			$i.css({
				"z-index": 9999,
				"top": y - 20,
				"left": x,
				"position": "absolute",
				"font-weight": "bold",
				"color": randomColor(),
				"-webkit-user-select": "none",
				"-moz-user-select": "none",
				"-ms-user-select": "none",
				"user-select": "none"
			});
			$("body").append($i);
			$i.animate({
				"top": y - 180,
				"opacity": 0
			},
			1500,
			function() {
				$i.remove();
			});
			
		}
	a_click ++;
		
    });
});

/* 代码块自定义标题支持
 * 读取 .chroma[data-title] 并应用到 .code-title 上，
 * 覆盖 CSS 默认的语言名显示（如 "C++"）。
 *
 * 注意：theme.js 的 initHighlight()（负责创建 .code-header）也在 DOMContentLoaded 中执行，
 * 且 custom.js 的 script 标签在 theme.js 之后，因此同一事件队列中 custom.js 的监听器
 * 会排在 theme.js 的监听器之后，保证 .code-header 已存在。
 */
document.addEventListener('DOMContentLoaded', function applyCustomCodeTitles() {
    document.querySelectorAll('.highlight > .chroma[data-title]').forEach(function($chroma) {
        var customTitle = $chroma.getAttribute('data-title');
        if (!customTitle) return;

        var $header = $chroma.querySelector('.code-header');
        if (!$header) return;

        var $titleSpan = $header.querySelector('.code-title');
        if (!$titleSpan) return;

        // 标记类：CSS 通过此类激活自定义标题样式
        $header.classList.add('has-custom-title');
        // 将标题写入 data 属性，供 CSS attr() 读取
        $titleSpan.setAttribute('data-custom-title', customTitle);
    });
});
