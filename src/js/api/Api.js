import Http from "../utils/Http"

var AlbumsApi = {

    getAlbums() {
        return Http.get('http://localhost:9999/albums');
    }
};

export { AlbumsApi };
