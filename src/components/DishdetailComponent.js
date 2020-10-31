import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {
	Card,
	CardImg,
	Button,
	CardText,
	CardBody,
	CardTitle,
	Label,
	Modal,
	Row,
	ModalHeader,
	ModalBody,
	Breadcrumb,
	BreadcrumbItem,
	Col,
} from 'reactstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { LocalForm, Control, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !val || val.length <= len;

const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}
	handleSubmit(values) {
		this.props.postComment(
			this.props.dishId,
			values.rating,
			values.author,
			values.yourcomment
		);
	}

	render() {
		return (
			<div>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => {
								this.handleSubmit(values);
							}}
						>
							<Row className="form-group">
								<Label htmlFor="rating" sm={12}>
									Rating
								</Label>
								<Col sm={12}>
									<Control.select
										model=".rating"
										id="rating"
										name="rating"
										className="form-control"
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" sm={12}>
									Your Name
								</Label>
								<Col sm={12}>
									<Control.text
										id="author"
										model=".author"
										name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											minLength: 'Must be greater than 2 numbers',
											maxLength: 'Must be 15 numbers or less',
										}}
									></Errors>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="yourcomment" sm={12}>
									Comment
								</Label>
								<Col sm={12}>
									<Control.textarea
										id="yourcomment"
										model=".yourcomment"
										name="yourcomment"
										className="form-control"
										rows={6}
									/>
								</Col>
							</Row>
							<Row>
								<Col sm={12}>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
				<Button outline color="dark" onClick={this.toggleModal}>
					<span className="fa fa-pencil  "></span> Submit Comment
				</Button>
			</div>
		);
	}
}

function RenderDish({ dish }) {
	if (dish != null)
		return (
			<div className="col-12 col-md-5 m-1">
				<FadeTransform
					in
					transformProps={{
						exitTransform: 'scale(0.5) translateY(-50%)',
					}}
				>
					<Card>
						<CardImg top src={baseUrl + dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</FadeTransform>
			</div>
		);
	else return <div></div>;
}

function RenderComment({ comment, dishId, postComment }) {
	const comments = (
		<Stagger in>
			{comment.map((desc) => {
				return (
					<Fade in>
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
					</Fade>
				);
			})}
		</Stagger>
	);

	return (
		<div className="col-12 col-md-5 m-1">
			<h4>Comments</h4>
			<ul className="list-unstyled">{comments}</ul>
			<CommentForm dishId={dishId} postComment={postComment} />
		</div>
	);
}
const Dishdetail = (props) => {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else if (props.dish != null) {
		const dishCard = <RenderDish dish={props.dish} />;
		const dishComments = (
			<RenderComment
				comment={props.comments}
				postComment={props.postComment}
				dishId={props.dish.id}
			/>
		);
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
	}
};

export default Dishdetail;
