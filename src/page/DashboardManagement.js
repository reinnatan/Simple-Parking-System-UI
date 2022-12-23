import { Button } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState }  from 'react';

function DashboardManagement(){
    const [idTicket, setIdTicket] = useState("");
    const [messagePay, setMessagePay] = useState("");
    const [tickets , setTickets] = useState([]);
    const [isUseEffect, setUseEffect] = useState(false);
    const columns = ["id", "created at", "date checkout", "date entrance","price", "pay"];

    function paySpecTicket(id){
        fetch("http://localhost:3001/pay-ticket",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"id_ticket":id})
        })
        .then(response => response.json())
        .then(data => {
            alert(data['message']);
            getAllTickets();
        });
    }

    const getAllTickets = () =>{
        fetch("http://localhost:3001/get-all-tickets")
        .then(response => {
            return response.json();
        })
        .then(data => {
            let temp = [];
            for(var i=0; i<data.tickets.length; i++){

                temp.push(
                    [
                        data.tickets[i]._id.$oid,
                        data.tickets[i].created_at,
                        data.tickets[i].date_checkout,
                        data.tickets[i].date_entrance,
                        data.tickets[i].price,
                         data.tickets[i].price == null &&
                            <Button variant="contained" data={data.tickets[i]._id.$oid} onClick={(e) => {
                                    paySpecTicket(e.currentTarget.attributes['data'].value);
                            }
                            }>Pay This Ticket !</Button>
                    ]
                )
            }
            setTickets(temp);
        });
    }


    useEffect(()=>{
            if(!isUseEffect){
                getAllTickets();
                setUseEffect(true);
            }
    }, [])


    const handleInput = (e)=>{
        setIdTicket(e.target.value);
    }

    return(
        <>
            <MUIDataTable
                title={"All Tickets"}
                data={tickets}
                columns={columns}
            />
        </>
    );

}

export default DashboardManagement;
