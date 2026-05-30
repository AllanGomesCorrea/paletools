export default function executeUnassignedItemsViewControllerOverrides() {
    const UTUnassignedItemsViewController_getUnassignedItems = UTUnassignedItemsViewController.prototype.getUnassignedItems;
    UTUnassignedItemsViewController.prototype.getUnassignedItems = function getUnassignedItems(...args) {
        repositories.Item.setDirty(ItemPile.PURCHASED);
        repositories.Item.setDirty(ItemPile.INBOX);

        UTUnassignedItemsViewController_getUnassignedItems.call(this, ...args);
    }
}