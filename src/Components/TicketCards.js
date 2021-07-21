import React from 'react'

//material-ui card imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    //const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.root}>
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
                        <strong>Title:</strong> {props.title}
                    </Typography>
                    <Typography style={{ fontSize: '14', marginLeft: 'auto' }} color="textSecondary" gutterBottom>
                        <strong>Logged By:</strong> {props.raised_by}
                    </Typography>
                </div>
                <div style={{ display: "flex", width: '100%' }}>
                    <Typography style={{ fontSize: '14', marginRight: 'auto' }} color="textSecondary" gutterBottom>
                        <strong>Assigned To:</strong> {props.assigned_to}
                    </Typography>
                    <Typography style={{ fontSize: '14', marginLeft: 'auto' }} color="textSecondary" gutterBottom>
                        <strong>Severity:</strong> {props.severity}
                    </Typography>
                    <Typography style={{ fontSize: '14', marginLeft: 'auto' }} color="textSecondary" gutterBottom>
                        <strong>Priority:</strong> {props.priority}
                    </Typography>
                </div>
                <div style={{ display: "flex", width: '100%' }}>
                    <Typography style={{ fontSize: '14'}} color="textSecondary" gutterBottom>
                        <strong>State:</strong> {props.state}
                    </Typography>
                </div>
                <div style={{ display: "flex", width: '100%' }}>
                    <Typography style={{ fontSize: '14'}} color="textSecondary" gutterBottom>
                        <strong>Description:</strong> {props.description}
                    </Typography>
                </div>
            </CardContent>
            
            <CardActions>
                <Button size="small" color="primary">Mitigate</Button>
                <Button size="small" color="secondary">Resolve</Button>
            </CardActions>
        </Card>
    )
}

export default TicketCards
