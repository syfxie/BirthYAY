import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import {COLORS} from "../../constants/Colors";

const ColoredButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'Capitalize',
    fontSize: 16,
    fontWeight:600,
    color: COLORS.darkGray,
    backgroundColor: COLORS.lightYellow,
    marginLeft: '10px',
    height:'30px',
    fontFamily: [
        'Lato',
        'Roboto',
        'Arial',
    ].join(','),
    '&:hover': {
        backgroundColor: COLORS.medYellow,
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.58)',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#f8eab2',
        borderWidth: '0px'
    }
});

export default ColoredButton
