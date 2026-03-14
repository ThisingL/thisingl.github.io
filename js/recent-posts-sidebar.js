/**
 * 首页右侧「最近修改文章」侧边栏定位逻辑
 * 复刻 theme.js 中 initToc() 的 #toc-auto 定位算法
 */
(function initRecentSidebar() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var $sidebar = document.getElementById('recent-auto');
    if (!$sidebar) return;

    // 960px 以下不显示（CSS 已 display:none，JS 也不计算）
    if (window.innerWidth <= 960) return;

    var $page = document.querySelector('.page.home');
    if (!$page) return;

    var $header = document.getElementById('header-desktop');
    var headerIsFixed = document.body.getAttribute('data-header-desktop') !== 'normal';
    var headerHeight = $header ? $header.offsetHeight : 0;
    var TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);

    // ── 计算横向位置（与 initToc 完全一致）──────────────────────
    function positionSidebar() {
      var rect = $page.getBoundingClientRect();
      var pageLeft = rect.left + window.scrollX;
      var pageRight = pageLeft + rect.width;
      var sidebarLeft = pageRight + 20;
      var sidebarMaxWidth = pageLeft - 40;

      $sidebar.style.left = sidebarLeft + 'px';
      $sidebar.style.maxWidth = sidebarMaxWidth + 'px';
      $sidebar.style.visibility = 'visible';
    }

    positionSidebar();

    // 侧边栏初始顶部位置（文档坐标），positionSidebar 调用后再读取
    var sidebarRect = $sidebar.getBoundingClientRect();
    var minSidebarTop = sidebarRect.top + window.scrollY;
    var minScrollTop = minSidebarTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);

    // 底部边界：LoveIt 主题 footer 使用 .footer 类
    var $footer = document.querySelector('.footer');

    // ── 垂直滚动定位（粘性效果）────────────────────────────────
    function onScroll() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var sidebarHeight = $sidebar.offsetHeight;

      var maxSidebarTop = Infinity;
      if ($footer) {
        var footerTop = $footer.getBoundingClientRect().top + window.scrollY;
        maxSidebarTop = footerTop - sidebarHeight;
        if (maxSidebarTop < minSidebarTop) {
          maxSidebarTop = minSidebarTop;
        }
      }

      var maxScrollTop = maxSidebarTop === Infinity
        ? Infinity
        : maxSidebarTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);

      if (scrollTop < minScrollTop) {
        // 页面顶部：绝对定位，贴近初始位置
        $sidebar.style.position = 'absolute';
        $sidebar.style.top = minSidebarTop + 'px';
      } else if (maxScrollTop !== Infinity && scrollTop > maxScrollTop) {
        // 页面底部：绝对定位，停在 footer 之上
        $sidebar.style.position = 'absolute';
        $sidebar.style.top = maxSidebarTop + 'px';
      } else {
        // 中间区域：固定在视口
        $sidebar.style.position = 'fixed';
        $sidebar.style.top = TOP_SPACING + 'px';
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 窗口 resize 时重新计算 ──────────────────────────────────
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 960) {
        $sidebar.style.visibility = 'hidden';
        return;
      }
      positionSidebar();
      // resize 后重新计算 minSidebarTop（页面布局可能变化）
      var newRect = $sidebar.getBoundingClientRect();
      minSidebarTop = newRect.top + window.scrollY;
      minScrollTop = minSidebarTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
      onScroll();
    });
  });
})();
