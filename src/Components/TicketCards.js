import React, { useState } from 'react'

//material-ui card imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import TicketResolutionModal from './TicketResolutionModal';

//card styles
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


function TicketCards(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    //const bull = <span className={classes.bullet}>•</span>;
    const handleMitigate = () => {
        if(props.state === 'Active')
            setOpenModal(true);
        else
            alert('Ticket should be in Active state, to mitigate')
    }
    const handleResolve = () => {
        if (props.state === 'Mitigated') {
            axios.post('https://icm-ticketing-tool.herokuapp.com/resolveTicket', {
                id: props.id,
                state: 'Resolved'
            })
                .then(() => {
                    alert('Ticket Resolved');
                    window.location.reload();
                })
                .catch((err) => { alert(err) });
        }
        else {
            alert('State should be Mitigated, before resolving');
        }

    }
    return (
        <div>
            <TicketResolutionModal id={props.id} openModal={openModal} closeModal={() => { setOpenModal(false) }} />
            <Card className={classes.root} id={props.id}>
                <CardContent>
                    <div style={{ display: "flex", width: '100%' }}>
                        <Typography style={{ fontSize: '14', marginRight: 'auto' }} color="textSecondary" gutterBottom>
                            <strong>Ticket Id:</strong> {props.id}
                        </Typography>
                        <Typography style={{ fontSize: '14', marginLeft: 'auto' }} color="textSecondary" gutterBottom>
                            <strong>Logged Time:</strong> {props.raised_timestamp}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", width: '100%' }}>
                        <Typography style={{ fontSize: '14', marginRight: 'auto' }} color="textSecondary" gutterBottom>
                            <strong>Assigned To:</strong> {props.assigned_to}
                        </Typography>
                        <Typography style={{ fontSize: '14', marginLeft: 'auto' }} color="textSecondary" gutterBottom>
                            <strong>Logged By:</strong> {props.raised_by}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", width: '100%' }}>
                        <Typography id='state' style={{ fontSize: '14', marginRight: 'auto' }} color="textSecondary" gutterBottom>
                            <strong>State:</strong> {props.state}
                        </Typography>
                        <Typography style={{ fontSize: '14', marginLeft: 'auto' }} color="textSecondary" gutterBottom>
                            <strong>Severity:</strong> {props.severity}
                        </Typography>
                        <Typography style={{ fontSize: '14', marginLeft: 'auto' }} color="textSecondary" gutterBottom>
                            <strong>Priority:</strong> {props.priority}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", width: '100%' }}>
                        <Typography style={{ fontSize: '14' }} color="textSecondary" gutterBottom>
                            <strong>Title:</strong> {props.title}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", width: '100%' }}>
                        <Typography style={{ fontSize: '14' }} color="textSecondary" gutterBottom>
                            <strong>Description:</strong> {props.description}
                        </Typography>
                    </div>
                    {(props.state === 'Mitigated' || props.state === 'Resolved') ?
                    (
                        <div style={{ display: "flex", width: '100%' }}>
                            <Typography style={{ fontSize: '14' }} color="textSecondary" gutterBottom>
                                <strong>Resolution:</strong> {props.resolution}
                            </Typography>
                        </div>
                    )
                        : null
                    }
                    {/* <div style={{ display: "flex", width: '100%' }}>
                        <Typography style={{ fontSize: '14' }} color="textSecondary" gutterBottom>
                            <strong>Resolution:</strong> {props.resolution}
                        </Typography>
                    </div> */}
                </CardContent>

                <CardActions>
                    <Button size="small" color="primary" onClick={handleMitigate}>Mitigate</Button>
                    <Button size="small" color="secondary" onClick={handleResolve}>Resolve</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default TicketCards
