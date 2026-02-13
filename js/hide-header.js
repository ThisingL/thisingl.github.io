(function() {
    function initHideHeader() {
        const scrollThreshold = 50;
        const headerDesktop = document.getElementById('header-desktop');
        const headerMobile = document.getElementById('header-mobile');
        let isMouseNearHeader = false;
        let isHeaderHidden = false;
        
        if (!headerDesktop && !headerMobile) return;
        
        function showHeader() {
            if (isHeaderHidden) {
                if (headerDesktop) {
                    headerDesktop.style.setProperty('transform', 'translateY(0)', 'important');
                }
                if (headerMobile) {
                    headerMobile.style.setProperty('transform', 'translateY(0)', 'important');
                }
                isHeaderHidden = false;
            }
        }
        
        function hideHeader() {
            if (!isHeaderHidden) {
                if (headerDesktop) {
                    headerDesktop.style.setProperty('transform', 'translateY(-100%)', 'important');
                }
                if (headerMobile) {
                    headerMobile.style.setProperty('transform', 'translateY(-100%)', 'important');
                }
                isHeaderHidden = true;
            }
        }
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > scrollThreshold && !isMouseNearHeader) {
                hideHeader();
            } else if (scrollTop <= 0) {
                showHeader();
            }
        }, { passive: true });
        
        let headerHeight = 0;
        if (headerDesktop) {
            headerHeight = Math.max(headerHeight, headerDesktop.offsetHeight || 60);
        }
        if (headerMobile) {
            headerHeight = Math.max(headerHeight, headerMobile.offsetHeight || 60);
        }
        
        document.addEventListener('mousemove', function(e) {
            if (e.clientY <= headerHeight + 20) {
                isMouseNearHeader = true;
                showHeader();
            } else {
                isMouseNearHeader = false;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > scrollThreshold) {
                    hideHeader();
                }
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHideHeader);
    } else {
        initHideHeader();
    }
})();
