import React from 'react'

const RupiahMoneyFormat = (props) => {
    const { num, disableRp } = props;
    const rupiah = num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
    const withRpText = disableRp ? "" : "Rp. ";
    return (
        <span>{withRpText}{rupiah}</span>
    )
}

export default RupiahMoneyFormat