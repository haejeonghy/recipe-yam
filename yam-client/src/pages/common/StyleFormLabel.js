import styled from 'styled-components'

const StyledLabel = styled.label`
font-size: 20px;
margin-right: 20px;
`

function StyleFormLabel({name}) {

    return (
        <StyledLabel>{name}</StyledLabel>
    )
}

export default StyleFormLabel;