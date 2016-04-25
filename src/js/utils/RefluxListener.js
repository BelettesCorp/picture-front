/**
 * Utility class replacing 'ListenerMixin' from Reflux. Since React doesn't support mixin anymore, we need a wrapper
 * to still use Reflux.
 *
 * This provides some functions to easily listen to Reflux action / store.
 */
class RefluxListener {

    listenToAction(action, callback) {
        this._addAction(action.listen(callback));
    }

    listenToStore(store, callback) {
        this._addStore(store.listen(callback));
    }

    _addAction(action) {
        let actions = this.actions || [];
        actions.push(action);
        this.actions = actions;
    }

    _addStore(store) {
        let stores = this.stores || [];
        stores.push(store);
        this.stores = stores;
    }

    stopListening() {
        if(this.actions) this.actions.map( a => a() );
        if(this.stores) this.stores.map( s => s() );
    }

    // TODO RCH : find a way to automatically call this function method from child. For the moment, we're using super.componentWillUnmount()
    componentWillUnmount() {
        this.stopListening();
    }

}

export default RefluxListener;