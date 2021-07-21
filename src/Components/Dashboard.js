import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TicketModal from './TicketModal'

import TicketCards from './TicketCards';

import axios from 'axios'
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      position: "fixed",
      bottom: theme.spacing(8),
      right: theme.spacing(10)
    },
  }
}));

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [cards, setCards] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get('https://icm-ticketing-tool.herokuapp.com/getAllTickets')
      .then((response) => {
        let res = [];
        response.data.forEach((card) => {
          res = [...res, <TicketCards key={card._id} id={card._id} title={card.title} description={card.description}
            severity={card.severity} priority={card.priority} raised_timestamp={card.raised_timestamp}
            raised_by={card.raised_by} assigned_to={card.assigned_to} state={card.state} resolution={card.resolution} />]
        })
        setCards(res);
      })
      .catch((err) => { console.log(err) });
  }, [])

  const openModalHandler = () => {
    setOpenModal(!openModal);
  }

  //trial
  window.addEventListener('keydown', function (event) {
    if (event.key === 'F9') {
      openModalHandler();
    }
  })
  return (
    <div>
      <h2 style={{textDecoration:'underline'}}>IcM - Ticketing Tool</h2>
      {(cards.length === 0) ? <LinearProgress /> : cards}
      <TicketModal openModal={openModal} closeModal={() => { setOpenModal(!openModal) }} />
      <div className={classes.root}>
        <Tooltip title="Log Ticket">
          <Fab size="medium" color="primary" aria-label="create ticket">
            <AddIcon onClick={openModalHandler} />
          </Fab>
        </Tooltip>
      </div>
    </div>
  )
}
