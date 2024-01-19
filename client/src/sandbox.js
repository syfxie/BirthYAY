import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function BirthdayCard({ user }) {
    return (
        <Card sx={{ height: "100px", borderRadius: '10px', marginTop: '20px', display: 'flex', alignItems:'center', justifyContent: 'center', paddingRight: '15px', paddingLeft: '15px', marginBottom: '0px', backgroundColor: COLORS.darkGreen,  boxShadow: '0px 0px 1px 1px gray'}}>
            <div style={{width: '120px'}}>
                <CardMedia
                    component="img"
                    sx={{ width: '120px', height: '80px', display: 'block'}}
                    image="/images/default-totoro-profile.png"
                    alt="User Image"
                />
            </div>

            <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                    <h1 style={{ color: COLORS.background, fontFamily: "Rowdies", marginBottom: '5px'}}>
                        {formatFullName(user)}
                    </h1>

                    <p style={{color: COLORS.lightGray,  fontFamily: 'Lato', marginTop:0}}>
                        Turns {calculateUpcomingAge(user).upcomingAge} on {calculateUpcomingAge(user).nextBirthday}
                    </p>
                </div>

                <div>
                    <h1 style={{ color: COLORS.background, fontFamily: "Rowdies", marginBottom: '5px'}}>
                        {calculateUpcomingAge(user).daysUntilNextBirthday}
                    </h1>

                    <p style={{color: COLORS.lightGray, fontFamily: 'Lato', marginTop:0, justifyContent: 'flex-end', display:'flex'}}>
                        Days
                    </p>
                </div>
            </CardContent>

            <div style={{ width: '20%', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', height: '100%', display: 'flex', flexDirection:'row', flexWrap: 'wrap'}}>
                <ColoredButton>
                    Remind Me
                </ColoredButton>

                <ColoredButton>
                    Plan a Gift
                </ColoredButton>
            </div>
        </Card>
    );
}
