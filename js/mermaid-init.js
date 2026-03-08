(function() {
    function initMermaid() {
        var mermaidElements = document.getElementsByClassName('mermaid');
        if (mermaidElements.length && typeof mermaid !== 'undefined') {
            mermaid.initialize({
                startOnLoad: false,
                theme: document.body.getAttribute('theme') === 'dark' ? 'dark' : 'neutral',
                securityLevel: 'loose'
            });
            for (var i = 0; i < mermaidElements.length; i++) {
                var el = mermaidElements[i];
                var id = el.id || ('mermaid-' + i);
                var content = el.textContent.trim();
                if (content) {
                    mermaid.render('svg-' + id, content, function(svgCode) {
                        el.innerHTML = svgCode;
                    }, el);
                }
            }
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initMermaid, 100);
        });
    } else {
        setTimeout(initMermaid, 100);
    }
})();
