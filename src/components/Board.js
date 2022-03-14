import React from 'react'
import PropTypes from 'prop-types'

import BoardLetter from './BoardLetter'

class Board extends React.Component {
    render() {
        return (
            <div className={'boardLine'}>
                {[0,1,2,3,4].map(l => <BoardLetter letter={this.props.letters[l].letter} color={this.props.letters[l].color}/>)}
            </div>
        )
    }

}

Board.propTypes = {
    letter: PropTypes.string.isRequired,
}

export default Board
