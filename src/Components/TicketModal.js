import React, {useState} from 'react'
import ReactDom from 'react-dom'
import '../Styles/TicketModal.css'

import axios from 'axios'


function TicketModal(props) {

    const [waitMsg, setwaitMsg] = useState('');

    if(props.openModal === false) 
        return null;

    //trial
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            props.closeModal()
        }
      })

    const MODAL_STYLE = {
            position:'fixed',
            top:'50%',
            left:'50%',
            transform:'translate(-50%,-50%)',
            backgroundColor:'#FFF',
            padding:'20px',
            textAlign:'center',
            zIndex:1000,
            display:'block',
            width:'80%',
            height:'50%',
            border:'3px solid blue',
        }
        const OVERLAY_STYLE = {
            position:'fixed',
            top:0,
            left:0,
            right:0,
            bottom:0,
            backgroundColor:'rgba(0,0,0, .7)',
            zIndex:1000
        }
    
    function getTime()
    {
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();

        // console.log(currentDate.getHours)

        const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear + " " + currentDate.getHours() + ":" + currentDate.getMinutes()+":"+currentDate.getMilliseconds();

        return dateString;  
    }
    const submitHandler = () =>{
        let name = document.getElementById('name').value;
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        let severity = document.getElementById('severity').value;
        let priority = document.getElementById('priority').value;
        let assignTo = document.getElementById('assignTo').value;

        setwaitMsg("Please Wait..");

        if(name !== "" && title !== "" && description !== "")
        {
            //push to the DB
            axios.post('https://icm-ticketing-tool.herokuapp.com/submitTicket',{
                title:title,
                description:description,
                severity:severity,
                priority:priority,
                raised_timestamp:getTime(),
                raised_by:name,
                assigned_to:assignTo,
                state:"Active",
                resolution:"Yet to be resolved"
            })
            .then((data)=>{setwaitMsg("");alert("Ticket Submitted Successfully");props.closeModal();})
            .catch((err)=>{setwaitMsg("");alert("Some error occured, please try again")});
        }
        else{
            setwaitMsg("");
            alert("Kindly fill the details properly");
        }
            
    }
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLE}></div>
            <div style={MODAL_STYLE}>
                <h3>Ticket logger</h3>
                <input className='elements' id="name" placeholder="Enter your name"></input> <br />
                <input className='elements' id="title" placeholder="Title"></input> <br />
                <textarea className='elements' id="description" placeholder="Description"></textarea> <br />
                <label className='elements' htmlFor="severity"> Severity:</label>
                <select name="Severity" id="severity" onChange={(e)=>{console.log(e.target.value)}}>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                </select>
                
                <label className='elements' htmlFor="priority">Priority:</label>
                <select name="Priority" id="priority" onChange={(e)=>{console.log(e.target.value)}}>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                </select>
                 <br />

                <label className='elements' htmlFor="assignTo">Assign to:</label>
                <select name="Assign To" id="assignTo" onChange={(e)=>{console.log(e.target.value)}}>
                    <option value="CSE Team">CSE Team</option>
                    <option value="Merch Team">Merch Team</option>
                    <option value="Store Studio Team">Store Studio Team</option>
                </select>
                <br />
                <button className='elements' id="submitButton" onClick={submitHandler}>Submit Ticket</button> 
                <button className='elements' id="cancelButton" onClick={()=>{setwaitMsg("");props.closeModal()}}>Cancel</button>  
                <br />
                {waitMsg}
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default TicketModal
