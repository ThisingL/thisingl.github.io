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

/* 修复侧边目录自动滚动到当前激活项 - 简化版 */
(function() {
    let lastActiveElement = null;
    let scrollTimer = null;

    function scrollTocItemIntoView(element) {
        if (!element || lastActiveElement === element) return;

        const tocContainer = document.getElementById('toc-auto');
        if (!tocContainer) return;

        lastActiveElement = element;

        // 清除之前的滚动计时器
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }

        // 延迟滚动，减少对主题的干扰
        scrollTimer = setTimeout(() => {
            try {
                const containerRect = tocContainer.getBoundingClientRect();
                const elementOffsetTop = element.offsetTop;
                const targetScrollTop = elementOffsetTop - (containerRect.height / 2);
                const maxScrollTop = tocContainer.scrollHeight - containerRect.height;
                const finalScrollTop = Math.max(0, Math.min(targetScrollTop, maxScrollTop));

                // 简单设置 scrollTop，不使用动画
                tocContainer.scrollTop = finalScrollTop;
            } catch (error) {
                // 静默失败
            }
        }, 200);
    }

    function init() {
        const tocContainer = document.getElementById('toc-auto');
        if (!tocContainer) return;

        let updateTimer = null;

        const observer = new MutationObserver(() => {
            if (updateTimer) clearTimeout(updateTimer);

            updateTimer = setTimeout(() => {
                const activeLink = tocContainer.querySelector('a.active');
                if (activeLink) {
                    scrollTocItemIntoView(activeLink);
                }
            }, 150);
        });

        observer.observe(tocContainer, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        });
    }

    // 延迟初始化
    setTimeout(init, 2000);
})();

