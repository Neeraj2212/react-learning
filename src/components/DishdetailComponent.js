import React from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
} from 'reactstrap';

function RenderDish({ dish }) {
	if (dish != null)
		return (
			<div className="col-12 col-md-5 m-1">
				<Card>
					<CardImg top src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</div>
		);
	else return <div></div>;
}

function RenderComment({ comment }) {
	const comments = comment.map((desc) => {
		return (
			<li key={desc.id}>
				<p>{desc.comment}</p>

				<p>
					-- {desc.author}, &nbsp;
					{new Intl.DateTimeFormat('en-US', {
						year: 'numeric',
						month: 'short',
						day: '2-digit',
					}).format(new Date(Date.parse(desc.date)))}
				</p>
			</li>
		);
	});

	return (
		<div className="col-12 col-md-5 m-1">
			<h4>Comments</h4>
			<ul className="list-unstyled">{comments}</ul>
		</div>
	);
}
const Dishdetail = (props) => {
	const dish = props.dish;
	if (dish == null) {
		return <div></div>;
	}
	const dishCard = <RenderDish dish={props.dish} />;
	const dishComments = <RenderComment comment={props.comments} />;
	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/menu">Menu</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{props.dish.name}</h3>
					<hr />
				</div>
			</div>
			<div className="row ">
				{dishCard}
				{dishComments}
			</div>
		</div>
	);
};

export default Dishdetail;
