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
    console.log('[TOC] 初始化目录自动滚动脚本');

    // 将目录项滚动到可视区域（居中显示）
    function scrollTocItemIntoView(element) {
        const tocContainer = document.getElementById('toc-auto');
        if (!tocContainer || !element) {
            console.log('[TOC] scrollTocItemIntoView: 容器或元素不存在');
            return;
        }

        console.log('[TOC] 滚动到激活项:', element.textContent.trim());

        const containerRect = tocContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        // 计算元素相对于容器的位置
        const relativeTop = elementRect.top - containerRect.top + tocContainer.scrollTop;

        // 计算目标滚动位置（让激活项显示在容器中间）
        const targetScrollTop = relativeTop - (containerRect.height / 2) + (elementRect.height / 2);

        console.log('[TOC] 当前滚动位置:', tocContainer.scrollTop, '目标位置:', targetScrollTop);

        // 平滑滚动到目标位置
        tocContainer.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });
    }

    // 等待页面完全加载
    function initTocAutoScroll() {
        console.log('[TOC] 尝试初始化...');

        const tocContainer = document.getElementById('toc-auto');
        if (!tocContainer) {
            console.log('[TOC] 未找到 #toc-auto 容器');
            return;
        }

        console.log('[TOC] 找到目录容器，开始设置观察器');

        // 使用 MutationObserver 监听目录项的 active 状态变化
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;

                    // 如果是链接元素且包含 active 类
                    if (target.tagName === 'A' && target.classList.contains('active')) {
                        console.log('[TOC] 检测到新的激活项');
                        // 平滑滚动到当前激活项
                        scrollTocItemIntoView(target);
                    }
                }
            });
        });

        // 配置观察选项
        const config = {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        };

        // 开始观察目录容器
        observer.observe(tocContainer, config);
        console.log('[TOC] MutationObserver 已启动');

        // 初始化时也检查一次
        const activeLink = tocContainer.querySelector('a.active');
        if (activeLink) {
            console.log('[TOC] 发现初始激活项，1秒后滚动');
            setTimeout(() => scrollTocItemIntoView(activeLink), 1000);
        } else {
            console.log('[TOC] 未发现初始激活项');
        }
    }

    // 多种方式确保初始化
    if (document.readyState === 'loading') {
        console.log('[TOC] 等待 DOMContentLoaded...');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('[TOC] DOMContentLoaded 触发');
            setTimeout(initTocAutoScroll, 500);
        });
    } else {
        console.log('[TOC] DOM 已加载，立即初始化');
        setTimeout(initTocAutoScroll, 500);
    }

    // 兼容完全加载
    window.addEventListener('load', function() {
        console.log('[TOC] window.load 触发');
        setTimeout(initTocAutoScroll, 1000);
    });
})();

