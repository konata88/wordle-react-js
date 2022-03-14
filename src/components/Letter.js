import React from 'react'
import PropTypes from 'prop-types'

const Letter = ({ name, onClickFunc, usedLetters }) => {
    return (
        <button onClick={() => {onClickFunc(name)}} className={usedLetters.includes(name.toLowerCase()) ? 'used' : ''}
        >
            {name}
        </button>
    )
}

Letter.propTypes = {
    name: PropTypes.string.isRequired,
    onClickFunc: PropTypes.func.isRequired,
    usedLetters: PropTypes.array.isRequired
}

export default Letter
