(function() {
    function extractMermaidContent() {
        var mermaidElements = document.getElementsByClassName('mermaid');
        var data = {};
        for (var i = 0; i < mermaidElements.length; i++) {
            var el = mermaidElements[i];
            var content = el.textContent.trim();
            if (content) {
                data[el.id] = content;
            }
        }
        return data;
    }
    
    function ensureMermaidData() {
        if (!window.config) return;
        if (!window.config.data) {
            window.config.data = {};
        }
        var mermaidData = extractMermaidContent();
        for (var key in mermaidData) {
            window.config.data[key] = mermaidData[key];
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureMermaidData);
    } else {
        ensureMermaidData();
    }
})();
