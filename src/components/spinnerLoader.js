import React, { useEffect, useState } from 'react'
import Spin from "../assets/spin.svg"
import "../Scss/components/_Spinner.scss"

export const SpinnerLoader = () => {
    const [text, setText] = useState('')
    const [showImg, setShowImg] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setText(' Chargement')
        }, 6000)
    }, [])

    return (
        <div>
            <div className='Spinner'>
                {
                    showImg ? (
                        <img src={Spin} alt='spinner-loader' />
                    ) : (
                        <h3>{text}</h3>
                    )
                }
            </div>
        </div>
    )
}
