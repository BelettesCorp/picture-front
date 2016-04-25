import Reflux from 'reflux'
import { AlbumActions } from '../actions'

var AlbumStore = Reflux.createStore({

    init() {
        this.listenTo(AlbumActions.getAlbums.completed, this.onGetAlbums);

        this.albums = [];
    },

    onGetAlbums(albums) {
        this.albums = albums;
        this.trigger(albums); // Notify to all listeners that this data is now available
    }

});

export default AlbumStore;
export { AlbumStore } ;