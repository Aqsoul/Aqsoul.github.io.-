import {makeStyles} from "@material-ui/core";

export default makeStyles(() => ({
    root: {
        maxWidth:'100%',
        width:'70%',
        height:'100%',
        borderRadius:'20px',
    },
    media: {
        width:'100%',
        height:'150px',
    },
    cardActions: {
        display:'flex',
        justifyContent:'flex-end',
    },
    cardContent: {
        display:'flex',
        justifyContent:'space-between',
    },
    cardPrice: {
        display:'flex',
        justifyContent:"space-between",
    }
}));