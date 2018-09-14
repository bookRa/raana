
import axios from 'axios';

class GetData {

  sendData(subr1, subr2) {
      return "Get Data Got: " +subr1+ " " +  subr2; 
//     axios.post('http://localhost:4200/items/add/post', {
//     subr1: subr1,
//     subr2: subr2
//   })
//   .then(function (response) {
//       console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
  }
}

export default GetData;