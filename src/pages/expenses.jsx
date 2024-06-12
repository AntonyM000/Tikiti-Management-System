// Month,appliances,electronics,exports,services,hardware

import React, { useEffect, useRef, useState } from "react";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Button, Form, Modal } from "react-bootstrap";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ViewTable from "../components/table";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


function Expenses() {
  const appliancesRef = useRef();
  const electronicsRef = useRef();
  const exportyRef = useRef();
  const servicesRef = useRef();
  const hardwareRef = useRef();
  const db = getFirestore(app);
  const auth = getAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const[refresh, setRefresh]= useState(false);

  //   const [expenses, setExpenses] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const appliances = appliancesRef.current.value;
    const electronics = electronicsRef.current.value;
    const exporty = exportyRef.current.value;
    const services = servicesRef.current.value;
    const hardware = hardwareRef.current.value;
    const userID = auth.currentUser.uid;
    
    if (!appliances || !electronics || !exporty || !services || !hardware){
      toast.error("Fill out all fields")
      return
    }
    
    try {
      await setDoc(doc(collection(db, "expenses")), {
        userID: userID,
        userAppliances: appliances,
        userElectronics: electronics,
        userExporty: exporty,
        userServices: services,
        userHardware: hardware,
        timestamp: new Date().getTime(),
        monthtimestamp: new Date().getMonth(),

      
      });
      console.log("Expense data added successfully");
      setRefresh(true)
      toast.success("Expense data added successfully");
    } catch (error) {
      console.error("Error adding expenses data:", error);
      toast.error("Error adding expenses data");

    }
  };
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        navigate("/login");
      } else {
        const fetchExpenses = async () => {
          const expensesList = [];
          const queryDocument = query(
            collection(db, "expenses"),
            where('userID', '==', user.uid)
          );
          const querySnapshot = await getDocs(queryDocument);
          querySnapshot.forEach((expensesDoc) => {            
            const userid = expensesDoc.data().userID
            console.log(userid)
            expensesList.push({...expensesDoc.data()})
            console.log(expensesList);
          });
          setExpenses(expensesList);
        };  
        fetchExpenses();
      }  
    });  
  }, [auth, db, navigate,refresh]);  
  
  return (
    <div>
      <h1>Expenses</h1>
        {/* pass props hapa */}
        <ViewTable>
    <thead>
        <tr>
          <th>#</th>
          <th>Month</th>
          <th>Appliance</th>
          <th>Electronics</th>
          <th>Exports</th>
          <th>Services</th>
          <th>Hardware</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.monthtimestamp}</td>
            <td>{item.userAppliances}</td>
            <td>{item.userElectronics}</td>
            <td>{item.userExporty}</td>
            <td>{item.userServices}</td>
            <td>{item.userHardware}</td>

          </tr>
        ))}
      </tbody></ViewTable>  
      
<Expensesmodal 
  appliancesRef={appliancesRef}
  electronicsRef={electronicsRef}
  exportyRef={exportyRef}
  servicesRef={servicesRef}
  hardwareRef={hardwareRef}  
  handleSubmit={handleSubmit}  
  />
        <Toaster position="top-right" reverseOrder={false}/>
        {/* <Toaster position="top-center" reverseOrder={true}/>
        <Toaster position="top-left" reverseOrder={false}/>
        <Toaster position="bottom-right" reverseOrder={true}/>
        <Toaster position="bottom-center" reverseOrder={false}/>
        <Toaster position="bottom-left" reversOrder={true}/> */}

    </div>        
  );
}  

export default Expenses;

function Expensesmodal({ appliancesRef, electronicsRef, exportyRef, servicesRef, hardwareRef, handleSubmit }) {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((s) => !s);
  };  
  const handleClose = () => {
    setShow((s) => !s);
  };  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add expenses
      </Button>
      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Expenses
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <form onSubmit={handleSubmit} className="modalform">
            <h4>Add Expenses</h4>
            <Form.Control className="bg-dark text-white" placeholder='Appliances...' ref={appliancesRef} />
            <Form.Control className="bg-dark text-white" placeholder="Electronics..." ref={electronicsRef} />
            <Form.Control className="bg-dark text-white" placeholder="Export..." ref={exportyRef} />
            <Form.Control className="bg-dark text-white" placeholder="Services..." ref={servicesRef} />
            <Form.Control className="bg-dark text-white" placeholder="Hardware..." ref={hardwareRef} />
            <button type="submit">Add data</button>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      
    </>    
  );
}  
  