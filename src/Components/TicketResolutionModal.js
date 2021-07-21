import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
function TicketResolutionModal(props) {
    const classes = useStyles();
    if (props.openModal === false)
        return null;
    const MODAL_STYLE = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: '#FFF',
        padding: '20px',
        textAlign: 'center',
        zIndex: 1000,
        display: 'block',
        width: '80%',
        height: '50%',
        border: '3px solid blue',
    }
    const OVERLAY_STYLE = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, .7)',
        zIndex: 1000
    }

    const handleMitigate = () => {
        let resolution = document.getElementById('resolution').value;
        if (resolution !== "") {
            axios.post('https://icm-ticketing-tool.herokuapp.com/mitigateTicket', {
                id: props.id,
                state: "Mitigated",
                resolution: resolution
            })
                .then(() => { alert('Ticket Mitigated'); window.location.reload(); })
                .catch((err) => alert(err));
        }
        else {
            alert('Kindly provide resolution');
        }

    }
    return ReactDom.createPortal(

        <>
            <div style={OVERLAY_STYLE}></div>
            <div style={MODAL_STYLE}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="resolution" label="Resolution" variant="outlined" />
                </form>
                <button onClick={handleMitigate}>Mitigate</button>
                <button onClick={() => { props.closeModal() }}>Close</button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default TicketResolutionModal
