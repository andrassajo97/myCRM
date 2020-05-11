import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/stageActions";

class CommentItem extends Component {
  onDeleteClick(id, stage_num, commentId) {
    this.props.deleteComment(id, stage_num, commentId, this.props.history);
  }

  render() {
    const { comment, id, stage_num } = this.props;
    const { user } = this.props.auth;

    return (
      <div className="container col-8 card mb-3">
        <div className="row">
          <div className="col-2">
            <a href="profile.html"></a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-8">
            <p className="lead">{comment.text}</p>
            {comment.name === user.name ? (
              <button
                onClick={this.onDeleteClick.bind(
                  this,
                  id,
                  stage_num,
                  comment._id
                )}
                className="btn btn-danger"
              >
                Törlés
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired,
  stage_num: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
