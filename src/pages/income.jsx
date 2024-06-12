
import React, { useEffect, useRef, useState } from "react";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Button, Form, Modal } from "react-bootstrap";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ViewTable from "../components/table";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/loader";



function Income() {
  const salaryRef = useRef();
  const expensesRef = useRef();
  const revenueRef = useRef();
  const salesRef = useRef();
  const netIncomeRef = useRef();
  const db = getFirestore(app);
  const auth = getAuth();
  const navigate = useNavigate();
  const [income, setIncome] = useState([]);
  const[refresh, setRefresh]= useState(false);
  //   const [income, setIncome] = useState('');
       
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const salary = salaryRef.current.value;
    const expenses = expensesRef.current.value;
    const revenue = revenueRef.current.value;
    const sales = salesRef.current.value;
    const netIncome = netIncomeRef.current.value;
    const userID = auth.currentUser.uid;

    
    if (!salary || !expenses || !revenue || !sales || !netIncome&& <Loader/>){
      toast.error("Fill out all fields!")
      return
    }
    try {
      await setDoc(doc(collection(db, "income")), {
        userID: userID,
        userSalary: salary,
        userExpenses: expenses,
        userRev: revenue,
        userSale: sales,
        userNetIncome: netIncome,
        timestamp: new Date().getTime(),
      });
      console.log("Income data added successfully");
      setRefresh(true);
      toast.success("Income data added successfully");
    } catch (error) {
      console.error("Error adding income data:", error);
      toast.error("Error adding income data")
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        navigate("/login");
      } else {
        const fetchIncome = async () => {
          const incomeList = [];
          const queryDocument = query(
            collection(db, "income"),
            where('userID', '==', user.uid)
          );
          const querySnapshot = await getDocs(queryDocument);
          querySnapshot.forEach((incomeDoc) => {            
                const userid = incomeDoc.data().userID
                console.log(userid)
                incomeList.push({...incomeDoc.data()})
                console.log(incomeList);
          });
          setIncome(incomeList);
        };  
        fetchIncome();
      }  
    });  
  }, [auth, db, navigate,refresh]);  
  
    return (
    <div>
      <h1>Income</h1>
      {/* pass props hapa */}
    <ViewTable>
    <thead>
        <tr>
          <th>#</th>
          <th>Salary</th>
          <th>Expenses</th>
          <th>Revenue</th>
          <th>Sales</th>
          <th>Net Income</th>
        </tr>
      </thead>
      <tbody>
        {income.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.userSalary}</td>
            <td>{item.userExpenses}</td>
            <td>{item.userRev}</td>
         ``   <td>{item.userSale}</td>
            <td>{item.userNetIncome}</td>
          </tr>
        ))}
      </tbody>
      </ViewTable>  
      
      <Incomemodal 
        salaryRef={salaryRef}
        expensesRef={expensesRef}
        revenueRef={revenueRef}
        salesRef={salesRef}
        netIncomeRef={netIncomeRef}  
        handleSubmit={handleSubmit}  
        />
        <Toaster position="top-right" reverseOrder={true}/>
        {/* <Toaster position="top-center" reverseOrder={false}/>
        <Toaster position="top-left" reverseOrder={true}/>
        <Toaster position="center" reverseOrder={true}/>
        <Toaster position="bottom-right" reverseOrder={true}/>
        <Toaster position="bottom-center" reverseOrder={false}/>
        <Toaster position="bottom-left" reverseOrder={true}/> */}

    </div>        
  );
}  

export default Income;

function Incomemodal({ salaryRef, expensesRef, revenueRef, salesRef, netIncomeRef, handleSubmit }) {
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
        Add income
      </Button>
      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={handleSubmit} className="modalform">
            <h4>Add Income</h4>

            <Form.Control className="bg-dark text-white" placeholder='Salary...' ref={salaryRef} />
            <Form.Control className="bg-dark text-white" placeholder="Expenses..." ref={expensesRef} />
            <Form.Control className="bg-dark text-white" placeholder="Revenue..." ref={revenueRef} />
            <Form.Control className="bg-dark text-white" placeholder="Sales..." ref={salesRef} />
            <Form.Control className="bg-dark text-white" placeholder="netIncome..." ref={netIncomeRef} />
            <button type="submit">Add data</button>
            {/* <Loader/> */}
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>    
  );
}  
  