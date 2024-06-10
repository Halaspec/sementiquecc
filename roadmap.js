window.addEventListener('load', function () {
    var dragContainer = document.querySelector('.drag-container');
    var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
    var columnGrids = [];
    var boardGrid;

    // Function to add invisible placeholders to each container
    function addInvisiblePlaceholders() {
        itemContainers.forEach(function(container) {
            var invisiblePlaceholder = document.createElement('div');
            invisiblePlaceholder.classList.add('board-item', 'invisible-placeholder');
            var innerContent = document.createElement('div');
            innerContent.classList.add('board-item-content');
            invisiblePlaceholder.appendChild(innerContent);
            container.appendChild(invisiblePlaceholder);
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
            dragStartPredicate: function (item, event) {
                return !item.getElement().classList.contains('invisible-placeholder');
            }
        })
        .on('dragInit', function (item) {
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

    // Initialize the board grid so we can drag those columns around.
    boardGrid = new Muuri('.board', {
        dragEnabled: true,
        dragHandle: '.board-column-header'
    });

    // Add invisible placeholders to each container
    addInvisiblePlaceholders();

    // Refresh the layout to ensure everything is correctly positioned
    setTimeout(function() {
        boardGrid.refreshItems().layout();
        columnGrids.forEach(function(grid) {
            grid.refreshItems().layout();
        });
    }, 100);
});
