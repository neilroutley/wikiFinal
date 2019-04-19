import React, { Component } from "react";
import "../api/methods";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			err: "",
			title: "",
			content: "",
			links: [],
			history: []
		};
	}

	searchQuery(e) {
		e.preventDefault();
		var searchText = document.getElementById("search").value;
		document.getElementById("search").value = "";
		if (searchText.length > 0) {
			this.callApi(searchText);
			this.setState({ history: [...this.state.history, searchText] });
		}
	}

	callApi(query) {
		Meteor.call("getData", query, (err, data) => {
			if (err) {
				this.setState = {
					err: err
				};
				return;
			}
			console.log("data: ", data);
			this.setState({
				title: data.title,
				content: data.text,
				links: data.links
			});
		});
	}

	renderHistory(){
		return this.state.history.map((p, i) => (
			<button key={i} alt={p}>
				{p}
			</button>
		));
	}

	renderLinks() {
		// console.log("rendering links: ", this.state.links);
		return this.state.links.map((p, i) => (
			<button key={i} alt={p["*"]} onClick={p["*"]}>
				{p["*"]}
			</button>
		));
	}

	renderContent() {
		return (
			<span
				dangerouslySetInnerHTML={{ __html: this.state.content["*"] }}
			/>
		);
	}

	render() {
		// console.log("App props: ", this.props);
		// console.log("App state: ", this.state);
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
					<div className="links">{this.renderHistory()}</div>
				</div>
				<div>
					<h3>Links</h3>
					<div className="links">{this.renderLinks()}</div>
				</div>

				<div>
					<h4>Content</h4>
					<div className="content">{this.renderContent()}</div>
				</div>
			</div>
		);
	}
}
