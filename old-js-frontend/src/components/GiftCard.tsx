// import React, { useState } from 'react';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

// import '../fonts.css';
// import { COLORS } from "../constants/Colors";
// import ColoredButton from "./UI/Button";
// import EditGiftModal from "./EditGiftModal";

// export default function GiftCard({ gift, deleteGift }) {

//     const [openModal, setOpenModal] = useState(false);

//     return (
//         gift && Object.keys(gift).length > 0 ?
//             <Card sx={{ minWidth: 200, maxWidth: 300, borderRadius: '15px', height:'100%' }}>
//                 <CardContent>
//                     <h2 style={{ color: COLORS.darkGray, fontFamily: "Rowdies", marginBottom: '5px', marginTop: '5px'}}>
//                         {gift.name}
//                     </h2>

//                     <p style={{color: COLORS.lightGray,  fontFamily: 'Lato', marginTop:0, fontSize: '14px'}}>
//                         {gift.receiver && gift.receiver.firstName ? gift.receiver.firstName : "Who's the surprised for?"}
//                     </p>

//                     <ColoredButton onClick={() => setOpenModal(true)}>
//                         Edit
//                     </ColoredButton>

//                     <ColoredButton onClick={() => deleteGift(gift)}>
//                         Delete
//                     </ColoredButton>

//                     <EditGiftModal gift={gift}
//                                    open={openModal}
//                                    setOpen={setOpenModal}
//                     />
//                 </CardContent>
//             </Card>
//             :
//             null
//     );
// }

