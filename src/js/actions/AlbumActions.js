var Reflux = require('reflux');
var BundlesApi = require('../api/Api').bundlesApi;

var BundleActions = {
    filterByProduct: Reflux.createAction(),
    filterByName: Reflux.createAction(),

    getBundles: Reflux.createAction({asyncResult: true}),
    saveBundle: Reflux.createAction({asyncResult: true}),
    updateBundle: Reflux.createAction({asyncResult: true}),
    deleteBundle: Reflux.createAction({asyncResult: true}),

    failed: Reflux.createAction(),
    saveBundleFailed: Reflux.createAction()
};

BundleActions.getBundles.listen(function () {
    BundlesApi.getBundles().then(function (bundles) {
        this.completed(bundles);
    }.bind(this)).catch(BundleActions.failed);
});

BundleActions.saveBundle.listen(function (bundle) {
    BundlesApi.saveBundle(bundle).then(function () {
        this.completed();
    }.bind(this)).catch(BundleActions.saveBundleFailed);
});

BundleActions.updateBundle.listen(function (bundle) {
    BundlesApi.updateBundle(bundle).then(function () {
        this.completed();
    }.bind(this)).catch(BundleActions.saveBundleFailed);
});

BundleActions.deleteBundle.listen(function (bundle) {
    BundlesApi.deleteBundle(bundle._id).then(function () {
        this.completed();
    }.bind(this)).catch(BundleActions.saveBundleFailed);
});

module.exports = BundleActions;