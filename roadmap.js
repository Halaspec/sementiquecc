window.onload = function() {
    initRoadmap();  // Initialize the roadmap after everything is loaded
};

window.addEventListener('resize', function() {
    // Refresh Muuri grid on window resize to ensure layout updates
    boardGrid.refreshItems().layout();
    columnGrids.forEach(function(grid) {
        grid.refreshItems().layout();
    });
});

function initRoadmap() {
    var dragContainer = document.querySelector('.drag-container');
    var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
    var columnGrids = [];
    var boardGrid;

    itemContainers.forEach(function (container) {
        var grid = new Muuri(container, {
            items: '.board-item',
            dragEnabled: true,
            dragSort: function () {
                return columnGrids;
            },
            dragContainer: dragContainer,
            dragAutoScroll: {
                targets: (item) => {
                    return [
                        { element: window, priority: 0 },
                        { element: item.getGrid().getElement().parentNode, priority: 1 },
                    ];
                }
            }
        })
        .on('dragStart', function (item) {
            item.getElement().style.width = item.getWidth() + 'px';
            item.getElement().style.height = item.getHeight() + 'px';
        })
        .on('dragReleaseEnd', function (item) {
            item.getElement().style.width = '';
            item.getElement().style.height = '';
            item.getGrid().refreshItems([item]);
        })
        .on('layoutStart', function () {
            boardGrid.refreshItems().layout();
        });

        columnGrids.push(grid);
    });

    boardGrid = new Muuri('.board', {
        dragEnabled: true,
        dragHandle: '.board-column-header',
        layoutOnInit: true
    });

    // Refresh the layout after initialization to ensure everything is correctly positioned
    setTimeout(function() {
        boardGrid.refreshItems().layout();
        columnGrids.forEach(function(grid) {
            grid.refreshItems().layout();
        });
    }, 500); // Delay can be adjusted based on your specific needs
}
