// import React from "react";
// import Card from '@mui/material/Card';
// import SideBar from "../../components/SideBar";
// import CardContent from '@mui/material/CardContent';
// import { h3, div, Avatar } from "@mui/material";

// import {COLORS} from "../../constants/Colors";
// import ColoredButton from "../../components/UI/Button";


// export default function UserProfile(){

//     return (
//         <div style={{display:'flex', flexDirection:'row', maxWidth:'1500px', height:'100vh'}}>
//             <SideBar/>
//             <div style={{justifyContent:'center', alignItems: 'center', display: 'flex', flex: '1 1 auto'}}>
//                 <div style={{width: '600px', maxWidth: '80%'}}>
//                     <Card sx={{ width: '100%', height: '50vh', borderRadius: '10px', boxShadow: '0 0 1px 1px lightgray', display: 'flex', flexDirection: 'row'}}>
//                         <div style={{padding:'20px', backgroundColor: COLORS.darkGreen, width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
//                             <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
//                                 <Avatar
//                                     alt="Profile Photo"
//                                     src="/images/default-totoro-profile.png"
//                                     sx={{ width: 100, height: 100,  borderWidth: '3px', borderColor: COLORS.lightYellow, borderStyle:'solid' }}
//                                 />

//                                 <h3 style={{color: COLORS.background,  fontFamily: 'Lato', marginBottom: '5px'}}>
//                                     Sophie Xie
//                                 </h3>

//                                 <h3 style={{color: COLORS.lightGray,  fontFamily: 'Lato', marginTop:0, fontSize: '14px'}}>
//                                     sophiexxie
//                                 </h3>

//                                 <h3 style={{color: COLORS.lightGray,  fontFamily: 'Lato', marginTop:0, fontSize: '14px', marginBottom: '5px'}}>
//                                     290 Followers
//                                 </h3>

//                                 <h3 style={{color: COLORS.lightGray,  fontFamily: 'Lato', marginTop:0, fontSize: '14px'}}>
//                                     281 Following
//                                 </h3>
//                             </div>

//                             <ColoredButton>
//                                 Log Out
//                             </ColoredButton>
//                         </div>

//                         <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', flex: '1 0 auto', paddingRight: '40px', paddingLeft: '40px'}}>
//                                 <div>
//                                     <h3 style={{color: COLORS.darkGray,  fontFamily: 'Lato', marginBottom: '5px'}}>
//                                         Turns 20 in
//                                     </h3>

//                                     <Card padding={0} sx={{height: '80px', backgroundColor: COLORS.darkGreen, borderRadius: '10px'}}>
//                                         <CardContent>
//                                             <h1 style={{color: COLORS.background,  fontFamily: 'Rowdies', marginTop:0}}>
//                                                 256 days
//                                             </h1>
//                                         </CardContent>
//                                     </Card>

//                                     <h3 style={{color: COLORS.darkGray,  fontFamily: 'Lato', marginBottom: '5px'}}>
//                                         On
//                                     </h3>

//                                     <Card padding={0} sx={{height: '80px', backgroundColor: COLORS.darkGreen, borderRadius: '10px'}}>
//                                         <CardContent>
//                                             <h1 style={{color: COLORS.background,  fontFamily: 'Rowdies', marginTop:0}}>
//                                                 January 18
//                                             </h1>
//                                         </CardContent>
//                                     </Card>
//                                 </div>

//                                 <div style={{justifyContent:'center',  display: 'flex', marginTop: '20px'}}>
//                                     <ColoredButton>
//                                         Add to Calendar!
//                                     </ColoredButton>
//                                 </div>
//                             </div>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     )
// }

