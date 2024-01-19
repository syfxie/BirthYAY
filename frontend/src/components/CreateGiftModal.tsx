// import React, {useEffect, useState}from 'react';
// import axios from "axios";

// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import {useFormik} from "formik";
// import {Alert, FormControl, InputLabel, Select, TextField} from "@mui/material";

// import {useAuth} from "../contexts/AuthContext";

export default function BirthdayCard(){
    return(
        <div>Hello</div>
    )
}

// export default function CreateGiftModal({open, setOpen}) {

//     const {user, token} = useAuth();

//     const createGift = async (giftData) => {
//         if (token && token.length > 0 && giftData) {
//             await axios.post('/api/gifts/',
//                 {
//                     name: giftData.name,
//                     price: giftData.price,
//                     starred: giftData.starred,
//                     receiver: giftData.receiver
//                 },
//                 {
//                     headers: {
//                         Authorization: `Token ${token}`,
//                         "Content-Type": 'application/json',
//                     },
//                 }).then((aResponse) => {
//                 setOpen(false);
//             });
//         }
//     }

//     const validate = (values) => {
//         const errors = {};

//         if (!values.name) {
//             errors.name = 'Required';
//         } else if (values.name.length > 20) {
//             errors.name = 'Must be 20 characters or less';
//         }
//         return errors;
//     };

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             price:0,
//             starred:false,
//             receiver:''
//         },
//         validate,
//         validateOnChange: false,
//         onSubmit: values => {
//             createGift(values);
//         }
//     });

//     const handleClose = () => {
//         setOpen(false);
//         formik.handleReset();
//     }

//     const modalStyle = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 600,
//         height: 400,
//         backgroundColor: 'white',
//         border: '2px solid #000',
//         borderRadius: '10px',
//         boxShadow: 24,
//         padding: '10px',
//         alignItems:'center',
//         justifyContent:'center',
//         display:'flex',
//         flexDirection:'column'
//     };

//     return (
//         <Modal open={open}
//                onClose={handleClose}
//         >

//             <div style={modalStyle}>
//                 <h3>Add a Gift</h3>
//                 <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'70%'}} onSubmit={formik.handleSubmit}>
//                     <TextField variant="outlined"
//                                margin="normal"
//                                fullWidth
//                                label="Name"
//                                name="name"
//                                value={formik.values.name}
//                                onChange={formik.handleChange}
//                     />
//                     {formik.errors.name ? <Alert severity="error">{formik.errors.name}</Alert> : null}

//                     <TextField variant="outlined"
//                                margin="normal"
//                                fullWidth
//                                label="Price (optional)"
//                                name="price"
//                                type="number"
//                                value={formik.values.price}
//                                onChange={formik.handleChange}
//                     />
//                     {formik.errors.price ? <Alert severity="error">{formik.errors.price}</Alert> : null}


//                     <TextField  margin="normal"
//                                 fullWidth
//                                 label="Starred (optional)"
//                                 name="starred"
//                                 type="checkbox"
//                                 value={formik.values.starred}
//                                 onChange={formik.handleChange}
//                     />
//                     {formik.errors.starred ? <Alert severity="error">{formik.errors.starred}</Alert> : null}

//                     <FormControl sx={{ marginTop: '20px', width:'100%' }}>
//                         <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
//                         <Select
//                             labelId="receiver-dropdown-label"
//                             value={formik.values.receiver}
//                             name="receiver"
//                             label="Receiver (optional)"
//                             onChange={formik.handleChange}
//                         >

//                             <MenuItem value="">
//                                 <em>None</em>
//                             </MenuItem>

//                             <MenuItem value={10}>Ten</MenuItem>
//                             <MenuItem value={20}>Twenty</MenuItem>
//                             <MenuItem value={30}>Thirty</MenuItem>
//                         </Select>
//                     </FormControl>

//                     {formik.errors.receiver ? <Alert severity="error">{formik.errors.receiver}</Alert> : null}

//                     <div style={{display: 'flex', width:'100%', justifyContent:'center'}}>
//                         <Button type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 style={{ margin: '20px', width: '40%' }}
//                         >
//                         Create
//                     </Button>
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     );
// }
