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

/* 代码块增强：自定义文件名标题 + 右侧语言名显示
 *
 * 对所有代码块：
 *   - 在 .copy 按钮左侧插入 .code-lang span，显示语言名（如 C++、Python）
 * 对带 {title="xxx"} 的代码块：
 *   - 左侧 .code-title 的 ::after 显示文件名（via data-custom-title + CSS attr()）
 *   - 语言名仍显示在右侧
 *
 * 最终布局：[箭头][文件名 or 默认留空]  ←flex→  [语言名][复制]
 *
 * 执行时机：DOMContentLoaded，排在 theme.js initHighlight() 之后（JS 加载顺序保证）
 */
document.addEventListener('DOMContentLoaded', function applyCustomCodeTitles() {
    // 语言类名 → 显示名称映射表（与主题 $code-type-list 保持一致，并补充 c++）
    var langMap = {
        'language-bash': 'Bash', 'language-c': 'C', 'language-cs': 'C#',
        'language-cpp': 'C++', 'language-c++': 'C++',
        'language-clojure': 'Clojure', 'language-coffeescript': 'CoffeeScript',
        'language-css': 'CSS', 'language-dart': 'Dart', 'language-diff': 'Diff',
        'language-erlang': 'Erlang', 'language-go': 'Go',
        'language-go-html-template': 'Go HTML Template', 'language-groovy': 'Groovy',
        'language-haskell': 'Haskell', 'language-html': 'HTML', 'language-http': 'HTTP',
        'language-xml': 'XML', 'language-java': 'Java', 'language-js': 'JavaScript',
        'language-javascript': 'JavaScript', 'language-json': 'JSON',
        'language-kotlin': 'Kotlin', 'language-latex': 'LaTeX', 'language-less': 'Less',
        'language-lisp': 'Lisp', 'language-lua': 'Lua', 'language-makefile': 'Makefile',
        'language-markdown': 'Markdown', 'language-matlab': 'Matlab',
        'language-objectivec': 'Objective-C', 'language-php': 'PHP',
        'language-perl': 'Perl', 'language-powershell': 'PowerShell',
        'language-posh': 'PowerShell', 'language-puppet': 'Puppet',
        'language-pwsh': 'PowerShell', 'language-python': 'Python',
        'language-r': 'R', 'language-ruby': 'Ruby', 'language-rust': 'Rust',
        'language-scala': 'Scala', 'language-scss': 'Scss', 'language-shell': 'Shell',
        'language-sql': 'SQL', 'language-swift': 'Swift', 'language-tex': 'TeX',
        'language-toml': 'TOML', 'language-ts': 'TypeScript',
        'language-typescript': 'TypeScript', 'language-vue': 'Vue',
        'language-yml': 'YAML', 'language-yaml': 'YAML',
    };

    document.querySelectorAll('.highlight > .chroma').forEach(function($chroma) {
        var $header = $chroma.querySelector('.code-header');
        if (!$header) return;

        // ── 1. 从 code-header 类名中提取语言类，查表得到显示名 ──
        var langClass = Array.from($header.classList).find(function(c) {
            return c.startsWith('language-');
        });
        var langName = langClass ? (langMap[langClass] || null) : null;

        // ── 2. 插入右侧语言名 span
        // 需要插在 .ellipses 之前，保证折叠时顺序为：[语言名][...]
        // （展开时 .ellipses 隐藏，顺序为：[语言名][复制]）
        if (langName) {
            var $lang = document.createElement('span');
            $lang.classList.add('code-lang');
            $lang.textContent = langName;
            var $ellipses = $header.querySelector('.ellipses');
            if ($ellipses) {
                $header.insertBefore($lang, $ellipses);
            } else {
                $header.appendChild($lang);
            }
        }

        // ── 3. 处理自定义文件名（仅对带 data-title 的代码块）──
        var customTitle = $chroma.getAttribute('data-title');
        if (!customTitle) return;

        var $titleSpan = $header.querySelector('.code-title');
        if (!$titleSpan) return;

        // 标记类 + data 属性，CSS 通过 attr(data-custom-title) 显示文件名
        $header.classList.add('has-custom-title');
        $titleSpan.setAttribute('data-custom-title', customTitle);
    });
});
