import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import API from './API';

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event_id: props.event_id,
      newComment: "",
      comments: [],
      loading: false
    };

    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    // loading
    this.setState({ loading: true });

    API.getReviews(this.state.event_id)
      .then(res => {
        this.setState({
          newComment: "",
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  updateComment = event => {
    this.setState({
      newComment: event.target.value
    });
  };

  addComment(e) {
    // prevent default form submission
    e.preventDefault();
    API.addReview({user_id: this.props.user.user_id, event_id: this.props.event_id, comment: this.state.newComment})
      .then(res => {
        this.setState({
          newComment: "",
          loading: false,
          comments: [res, ...this.state.comments]
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="infoCardContent">

        <div className="row infoCardContent">
          <div className="col-4  pt-3 border-right">
            <h6>Say something about Event</h6>
            <React.Fragment>
              <form method="post" onSubmit={this.addComment}>

                <div className="form-group">
                  <textarea
                    onChange={this.updateComment}
                    value={this.state.newComment}
                    className="form-control"
                    placeholder=" Your Comment"
                    name="message"
                    rows="8"
                  />
                </div>

                <div className="form-group">
                  <button disabled={this.state.loading || !this.state.newComment} className="btn btn-primary">
                    Comment &#10148;
                  </button>
                </div>
              </form>
            </React.Fragment>
          </div>
          
          <div className="col-8  pt-3 bg-white eventInfoBody">
            <div className="commentList">
              <h5 className="text-muted mb-4">
                <span className="badge badge-success">{this.state.comments.length}</span>{" "}
                Comment{this.state.comments.length > 1 ? "s" : ""}
              </h5>

              {this.state.comments.length === 0 ? (
                <div className="alert text-center alert-info">
                  Be the first to comment
                </div>
              ) : null}

              {this.state.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Comment(props) {
  const { user, comment, timestamp } = props.comment;

  return (
    <div className="media mb-3">
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{timestamp}</small>
        <h6 className="mt-0 mb-1 text-muted">{user.full_name}</h6>
        {comment}
      </div>
    </div>
  );
}

export default ChatBox;