import React from 'react'

const RupiahMoneyFormat = (props) => {
    const { num } = props;
    const rupiah = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (
        <span>Rp. {rupiah}</span>
    )
}

export default RupiahMoneyFormat