import React from 'react'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    loading: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 'calc(50% - 20px)',
        margin: 'auto',
        height: '40px',
        width: '40px',
     
    },
}))

const Loading = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.loading}>
            {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
            <CircularProgress />
        </div>
    )
}

export default Loading
