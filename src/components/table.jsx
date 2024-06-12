import Table from 'react-bootstrap/Table';

function ViewTable({ children } ) {
  return (
    <Table striped bordered hover>
     {children}
    </Table>
  );
}

export default ViewTable;

// export const TableExample= ({children})=>{
//   return(
//     <Table>
//       {children}
//     </Table>
//   )
// }
