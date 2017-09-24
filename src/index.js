import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';
const API_KEY = 'AIzaSyDRdmm4d83H_sn18NU8y8ypJGkJFiMJZKs';

class App extends Component{
	constructor(props){
		super(props);
		this.state={ 
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('surfboards');
	}
	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render(){
		const VideoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
		return(
			<div>
				<SearchBar onSearchTermChange={VideoSearch}/>
				<VideoDetails 
					video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={ selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />

			</div>
			
		);
	}
}

ReactDom.render(<App />, document.querySelector('#root'));