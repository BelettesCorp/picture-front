import Reflux from 'reflux';
import { AlbumsApi  } from '../api/Api'

var AlbumActions = {
    getAlbums:          Reflux.createAction({asyncResult: true})
};

AlbumActions.getAlbums.listen( function() {
    AlbumsApi.getAlbums().done((data) => {
        this.completed(data);
    }).fail(this.failed);
});

export { AlbumActions };