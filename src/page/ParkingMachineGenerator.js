import redButton from '../img/red-button.jpg';
import yellowButton from '../img/yellow-button.jpg';
import '../css/TicketMachine.css';
import React, { useState }  from 'react';


function TiketParkingGenerator(){
    const vehicleType = "car";
    const placeName = "BSD Mall";
    const [response, setResponse] = useState("");
    const window = React.createRef();

    const generateTicket = () =>{
        fetch("http://localhost:3001/get-ticket?vehicle_type="+vehicleType+"&place_name="+placeName)
            .then(response => response.json())
            .then(data => {console.log(data)
                setResponse(data);
        });
    }
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>Parking machine</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tombol Bantuan</td>
                    <td>Print Ticket</td>
                </tr>
                <tr>
                    <td className='CenterImage'><img width={50} height={50} src={redButton}/></td>
                    <td className='CenterImage'><img width={50} height={50} src={yellowButton} onClick={generateTicket}/></td>

                </tr>

            </tbody>

        </table>
        {
            response.qr_code !=null &&
            <>
                Parking Ticket<br/>
                <strong>{response.parking_district}</strong><br/>
                Ticket No &nbsp;:&nbsp;&nbsp; {response.ticket_id}<br/>
                Date Enter &nbsp;:&nbsp;&nbsp; {response.date_enter}<br/>
                Date Enter &nbsp;:&nbsp;&nbsp; {response.time_enter}<br/>
                <img src={`data:image/png;base64,${response.qr_code}`} width={250} height={250}/><br/>
                &nbsp;SELAMAT DATANG DI <br/>
                &nbsp;{response.parking_district}<br/>
                &nbsp;SIMPAN TIKET INI DENGAN AMAN<br/>
            </>
        }


    </>

    );
}

export default TiketParkingGenerator
