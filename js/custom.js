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

/* 修复侧边目录自动滚动到当前激活项 */
(function() {
    console.log('[TOC] 初始化目录自动滚动脚本 v2');

    let lastActiveElement = null;

    // 简单的滚动函数，使用原生 scrollIntoViewIfNeeded 或 scrollIntoView
    function scrollTocItemIntoView(element) {
        if (!element || lastActiveElement === element) {
            return;
        }

        const tocContainer = document.getElementById('toc-auto');
        if (!tocContainer) return;

        console.log('[TOC] 滚动到激活项:', element.textContent.trim());
        lastActiveElement = element;

        // 使用 requestAnimationFrame 确保在下一帧执行，避免和主题逻辑冲突
        requestAnimationFrame(() => {
            try {
                // 优先使用 scrollIntoViewIfNeeded（Chrome/Safari）
                if (typeof element.scrollIntoViewIfNeeded === 'function') {
                    element.scrollIntoViewIfNeeded({ behavior: 'smooth', block: 'center' });
                } else {
                    // 降级使用 scrollIntoView
                    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
                }
                console.log('[TOC] 滚动完成');
            } catch (error) {
                console.error('[TOC] 滚动失败:', error);
            }
        });
    }

    // 初始化函数
    function initTocAutoScroll() {
        const tocContainer = document.getElementById('toc-auto');
        if (!tocContainer) {
            console.log('[TOC] 未找到目录容器');
            return false;
        }

        console.log('[TOC] 找到目录容器，设置监听');

        // 使用事件委托监听所有链接的 class 变化
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'class' &&
                    mutation.target.tagName === 'A') {

                    const link = mutation.target;
                    if (link.classList.contains('active')) {
                        console.log('[TOC] 检测到激活项变化');
                        // 延迟执行，等主题逻辑完成
                        setTimeout(() => scrollTocItemIntoView(link), 150);
                        break; // 只处理第一个
                    }
                }
            }
        });

        observer.observe(tocContainer, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        });

        console.log('[TOC] 监听已启动');
        return true;
    }

    // 延迟初始化
    setTimeout(() => {
        if (initTocAutoScroll()) {
            console.log('[TOC] 初始化成功！');
        } else {
            console.log('[TOC] 当前页面可能没有目录');
        }
    }, 2000); // 等待主题完全初始化
})();

