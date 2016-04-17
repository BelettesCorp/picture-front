import React from 'react'
import aggregation from 'aggregation'
import RefluxListener from '../../utils/RefluxListener'

import { AlbumActions } from '../../actions'
import { AlbumStore } from '../../stores'

// Definition of the Albums view
// Here we're using aggregation framework to have a "mixin / multiple inheritance" mechanism
// We do this to have both behavior from React component (needed to display something in your browser),
// and RefluxListener (needed to listen to any changes on Stores/Actions)
class Albums extends aggregation(React.Component, RefluxListener) {

    constructor() {
        // Always call super() first (this will tell React "hey, create a new component !"
        super();
        // Initialize your React state here with what you want. State contains dynamic variables used for your logic view
        this.state = {
            albums: []
        };

        // Listen to every changes on the AlbumStore
        // When store will load any data, this component will know that and will call the 'getAllbums' function
        this.listenToStore(AlbumStore, this.getAllAlbums);
    }

    // Always use ES6 arrow notation to attach this function to the component
    // Trigger a call to a Reflux Action that will get all albums from API
    getAlbums = () => {
        AlbumActions.getAlbums();
    };

    // Callback to put all albums from API inside our component state
    getAllAlbums = (albums) => {
        this.setState({ albums: albums });
    };

    // Here you're rendering your React component by writing some JSX syntax
    // This combine HTML tags and React syntax
    render() {
        return (
            <div>
                <h1>My Albums</h1>
                <input type="button" onClick={this.getAlbums} value="get albums"/>
                <div id="albums">
                    { this.state.albums.map( (album) => <Album album={album} key={album._id}/> )}
                </div>
            </div>
        );
    }

}

// Here is a sub React component representing the rendering of a single Album
class Album extends aggregation(React.Component) {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="album">
                { this.props.album.name }
            </div>
        )
    }
}

export default Albums;