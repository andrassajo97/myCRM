import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, id, stage_num } = this.props;

    let commentsContent;

    if (comments) {
        commentsContent = comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} id={id} stage_num={stage_num} />
      ));
    }

    return (<div className="col-12">{commentsContent}</div>)
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  id: PropTypes.array.isRequired,
  stage_num: PropTypes.array.isRequired,
};

export default CommentFeed;
