import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TicketModal from './TicketModal'

import TicketCards from './TicketCards';



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
  const classes = useStyles();

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
      <h2>Press F9 or the + button.</h2>
      <TicketCards />
      <TicketModal openModal={openModal} closeModal={() => { setOpenModal(!openModal) }} />
      <div className={classes.root}>
        <Fab size="medium" color="primary" aria-label="create ticket">
          <AddIcon onClick={openModalHandler} />
        </Fab>
      </div>
    </div>
  )
}
