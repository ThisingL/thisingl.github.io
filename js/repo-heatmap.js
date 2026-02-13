(function() {
    const owner = 'ThisingL';
    const repo = 'thisingl.github.io';
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    async function fetchCommitActivity() {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch commit activity:', error);
            return null;
        }
    }
    
    function getColor(count, maxCount) {
        if (count === 0) return '#ebedf0';
        
        const colors = [
            '#ebedf0',
            '#ACEEBB',
            '#4AC26B',
            '#116329'
        ];
        
        if (count <= 1) return colors[1];
        if (count <= 3) return colors[2];
        return colors[3];
    }
    
    function generateHeatmapSVG(data) {
        if (!data || data.length === 0) {
            return '<text x="10" y="20" fill="#666">No commit data available</text>';
        }
        
        const maxCount = Math.max(...data.map(week => Math.max(...week.days)));
        
        const cellSize = 13;
        const cellGap = 3;
        const leftPadding = 35;
        const topPadding = 25;
        const bottomPadding = 5;
        const rightPadding = 10;
        
        const width = data.length * (cellSize + cellGap) + leftPadding + rightPadding;
        const height = 7 * (cellSize + cellGap) + topPadding + bottomPadding;
        
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="font-family: 'Hack', 'QianZiBi', monospace; font-size: 10px;">`;
        
        svg += `<style>
            .heatmap-cell { rx: 2; ry: 2; }
            .heatmap-cell:hover { stroke: #333; stroke-width: 1; }
            .month-label { fill: #666; font-size: 12px; }
            .day-label { fill: #666; font-size: 12px; }
        </style>`;
        
        for (let i = 0; i < 7; i++) {
            if (i % 2 === 1) {
                const y = i * (cellSize + cellGap) + topPadding + cellSize / 2 + 3;
                svg += `<text x="0" y="${y}" class="day-label">${dayNames[i]}</text>`;
            }
        }
        
        let lastMonth = -1;
        let lastYear = -1;
        data.forEach((week, weekIndex) => {
            const weekStart = new Date(week.week * 1000);
            const weekStartMonth = weekStart.getUTCMonth();
            const weekStartDate = weekStart.getUTCDate();
            const weekStartYear = weekStart.getUTCFullYear();
            
            if (weekStartDate <= 7 && weekStartMonth !== lastMonth) {
                const x = weekIndex * (cellSize + cellGap) + leftPadding;
                
                if (weekStartYear !== lastYear && weekStartMonth === 0) {
                    svg += `<text x="${x}" y="12" class="month-label">${weekStartYear}</text>`;
                    lastYear = weekStartYear;
                } else {
                    svg += `<text x="${x}" y="12" class="month-label">${monthNames[weekStartMonth]}</text>`;
                }
                lastMonth = weekStartMonth;
            }
        });
        
        data.forEach((week, weekIndex) => {
            week.days.forEach((count, dayIndex) => {
                const x = weekIndex * (cellSize + cellGap) + leftPadding;
                const y = dayIndex * (cellSize + cellGap) + topPadding;
                const color = getColor(count, maxCount);
                
                const weekDate = new Date(week.week * 1000);
                weekDate.setDate(weekDate.getDate() + dayIndex);
                const dateStr = weekDate.toISOString().split('T')[0];
                
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                
                const cellDate = new Date(weekDate);
                cellDate.setHours(23, 59, 59, 999);
                
                if (cellDate > today) {
                    return;
                }
                
                svg += `<rect 
                    class="heatmap-cell" 
                    x="${x}" 
                    y="${y}" 
                    width="${cellSize}" 
                    height="${cellSize}" 
                    fill="${color}"
                    data-count="${count}"
                    data-date="${dateStr}"
                />`;
            });
        });
        
        svg += '</svg>';
        
        const legendColors = ['#ebedf0', '#ACEEBB', '#4AC26B', '#116329'];
        let legendHTML = '<div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px; margin-top: 12px; font-size: 12px; color: #666; width: 100%;">';
        legendHTML += '<span>Less</span>';
        legendColors.forEach(color => {
            legendHTML += `<div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 2px; flex-shrink: 0;"></div>`;
        });
        legendHTML += '<span>More</span>';
        legendHTML += '</div>';
        
        const titleHTML = '<div style="font-size: 14px; color: #666; margin-bottom: 8px; text-align: center; width: 100%; font-family: \'Hack\', \'QianZiBi\', monospace;">看看我的更新频率</div>';
        
        return '<div style="display: flex; flex-direction: column; align-items: flex-end;">' + titleHTML + svg + legendHTML + '</div>';
    }
    
    async function initHeatmap() {
        const container = document.getElementById('repo-heatmap');
        if (!container) return;
        
        container.innerHTML = '<span style="color: #666; font-size: 12px;">Loading...</span>';
        
        const data = await fetchCommitActivity();
        
        if (data) {
            container.innerHTML = generateHeatmapSVG(data);
        } else {
            container.innerHTML = '<span style="color: #999; font-size: 12px;">Failed to load heatmap</span>';
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeatmap);
    } else {
        initHeatmap();
    }
})();
