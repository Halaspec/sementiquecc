window.addEventListener('load', function () {
    var dragContainer = document.querySelector('.drag-container');
    var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
    var columnGrids = [];
    var boardGrid;

    // Function to add a placeholder to empty containers
    function addPlaceholders() {
        itemContainers.forEach(function(container) {
            if (container.children.length === 0) {
                var placeholder = document.createElement('div');
                placeholder.classList.add('placeholder');
                placeholder.innerHTML = 'Drop items here';
                container.appendChild(placeholder);
            }
        });
    }

    // Function to remove placeholders
    function removePlaceholders() {
        var placeholders = document.querySelectorAll('.placeholder');
        placeholders.forEach(function(placeholder) {
            placeholder.parentNode.removeChild(placeholder);
        });
    }

    // Initialize the column grids so we can drag those items around.
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
            },
        })
        .on('dragInit', function (item) {
            item.getElement().style.width = item.getWidth() + 'px';
            item.getElement().style.height = item.getHeight() + 'px';
            removePlaceholders();
        })
        .on('dragReleaseEnd', function (item) {
            item.getElement().style.width = '';
            item.getElement().style.height = '';
            item.getGrid().refreshItems([item]);
            addPlaceholders();
        })
        .on('layoutStart', function () {
            boardGrid.refreshItems().layout();
        });

        columnGrids.push(grid);
    });

    // Initialize the board grid so we can drag those columns around.
    boardGrid = new Muuri('.board', {
        dragEnabled: true,
        dragHandle: '.board-column-header'
    });

    // Initial call to add placeholders to empty containers
    addPlaceholders();

    // Refresh the layout to ensure everything is correctly positioned
    setTimeout(function() {
        boardGrid.refreshItems().layout();
        columnGrids.forEach(function(grid) {
            grid.refreshItems().layout();
        });
    }, 100);
});
