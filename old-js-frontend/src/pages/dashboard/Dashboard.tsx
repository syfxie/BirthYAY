import React, {useEffect, useState} from "react";
import axios from "axios";

import {Grid, Stack} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import '../../fonts.css'
import SideBar from '../../components/SideBar';
// import GiftCard from "../../components/GiftCard";
import {COLORS} from "../../constants/Colors";
import {useAuth} from "../../contexts/AuthContext";
// import BirthdayCard from '../../components/BirthdayCard'
// import CreateGiftModal from "../../components/CreateGiftModal";
// import CornerUserProfile from "../../components/CornerUserProfile";



// export default function Dashboard() {

//     // const {user, token, isLoggedIn} = useAuth();

//     const [gifts, setGifts] = useState([]);
//     const [openModal, setOpenModal] = useState(false);
//     const [birthdayUsers, setBirthdayUsers] = useState([]);

//     // Methods

//     const getBirthdays = async () => {
//         await axios.get('/api/upcoming-birthdays/', {
//                 headers: {
//                     Authorization: `Token ${token}`
//                 },
//             }
//         ).then((aResponse) => {
//             let thisYearUsers = aResponse.data.this_year;
//             let nextYearUsers = aResponse.data.next_year;
//             let mergedBirthdayUsers = [];

//             Object.keys(thisYearUsers).forEach(key => {
//                 mergedBirthdayUsers.push(thisYearUsers[key]);
//             });

//             Object.keys(nextYearUsers).forEach(key => {
//                 mergedBirthdayUsers.push(nextYearUsers[key]);
//             });
//             setBirthdayUsers(mergedBirthdayUsers.slice(0, 3));

//         });
//     }

//     const getGifts = async () => {
//         await axios.get('/api/gifts/', {
//                 headers: {
//                     Authorization: `Token ${token}`
//                 },
//             }
//         ).then((aResponse) => {
//             setGifts(aResponse.data.results);
//         });
//     }

//     const deleteGift = async (aGift) => {
//         if (token && token.length > 0 && aGift && aGift.id) {
//             await axios.delete(`/api/gifts/${aGift.id}/`, {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                 },
//             }).then((aResponse) => {
//                 let updatedGifts = [...gifts];
//                 const indexToRemove = updatedGifts.indexOf(aGift);

//                 if (indexToRemove !== -1) {
//                     updatedGifts.splice(indexToRemove, 1);
//                     setGifts(updatedGifts);
//                 }
//             });
//         }
//     }

//     useEffect(() => {
//         if (isLoggedIn() && token) {
//             getBirthdays();
//             getGifts();
//         }
//     }, [user]);

//     return (
//         user && birthdayUsers && gifts ?
//             <div style={{display:'flex', flexDirection:'row', maxWidth:'1500px', height:'100vh'}}>
//                 <SideBar/>

//                 <div style={{justifyContent:'center', alignItems: 'center', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', flex: '1 1 auto', overflowY:'auto'}}>
//                     <div style={{maxWidth: '80%', marginTop: '80px'}}>
//                         <div style={{justifyContent: 'flex-end', display: 'flex', }}>
//                             <CornerUserProfile/>
//                         </div>

//                         <div style={{marginTop:'30px'}}>
//                             <h1 style={{fontFamily: 'Rowdies', color: COLORS.darkGray}}>
//                                 Upcoming Birthdays
//                             </h1>

//                             {birthdayUsers && birthdayUsers.length > 0 ?
//                                 <Stack sx={{width:'100%'}}
//                                        spacing={2}
//                                 >
//                                     {birthdayUsers.map((aUser, aIndex) => {
//                                         return <BirthdayCard key={'Birthday User' + aIndex} user={aUser} />;
//                                     })
//                                     }
//                                 </Stack>
//                                 :
//                                 null
//                             }
//                         </div>

//                         <div style={{marginTop:'20px', marginBottom: '20px'}}>
//                             <div style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
//                                 <h1 style={{fontFamily: 'Rowdies', color: COLORS.darkGray}}>
//                                     My Gifts
//                                 </h1>

//                                 <IconButton onClick={() => setOpenModal(true)}>
//                                     <AddCircleOutlineOutlinedIcon/>
//                                 </IconButton>
//                             </div>

//                             <CreateGiftModal open={openModal}
//                                              setOpen={setOpenModal}
//                             />

//                             <Grid container sx={{width:'100%'}}
//                                   spacing={2}
//                             >
//                                 {gifts.slice(0, 3).map((aGift, aIndex) => {
//                                     return <Grid key={'Gift' + aIndex}
//                                                  xs={10} md={4} item
//                                     >
//                                         <GiftCard gift={aGift}
//                                                   deleteGift={deleteGift}/>
//                                     </Grid>;
//                                 })
//                                 }
//                             </Grid>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             :
//             null
//     );
// }
