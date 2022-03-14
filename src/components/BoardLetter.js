import React from 'react'
import PropTypes from 'prop-types'

class BoardLetter extends React.Component {
    render() {
        return (
            <div className={this.props.color}>
                {this.props.letter}
            </div>
        )
    }
}

BoardLetter.propTypes = {
    letter: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default BoardLetter
