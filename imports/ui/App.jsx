import React, { Component } from "react";
import "../api/methods";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			err: "",
			data: [],
		};
	}

	searchQuery(e) {
		e.preventDefault();
		var searchText = document.getElementById("search").value;
		document.getElementById("search").value = "";
		if (searchText.length > 0) {
			this.callApi(searchText);

		}
	}

	async callApi(query) {
		// Meteor.call("getData", { query: query }, (err, data) => {
		//   if (err) {
		//     this.setState = {
		//       err: err
		//     };
		//     return;
		//   }
		//   this.setState({
		//     data: data
		//   });
		// });
		console.log(query);
	}

	renderContent(){
		console.log("rendering content: ", this.state.data);
	}

	render() {
		console.log("App props: ", this.props);
		console.log("App state: ", this.state)
		return (
			<div className="container">
				{this.state.err ? <div>Error! {this.state.err}</div> : ""}
				<h1 className="text-centerr">Wiki Explorer</h1>
				<form
					onSubmit={this.searchQuery.bind(this)}
					className="search-field"
				>
					<input
						id="search"
						className=""
						type="text"
						placeholder="Search..."
						aria-label="Search"
					/>
				</form>
				<div>
					<h2>History</h2>
				</div>
				<div>
					<h3>Links</h3>
				</div>

				<div>
					<h4>Content</h4>
					<div className="content">{this.renderContent()}</div>
				</div>
			</div>
		);
	}
}
