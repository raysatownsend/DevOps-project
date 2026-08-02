import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    back: {
        width:45,
        height:45,
    },

    detailsTitle: {
        color: '#000000',
        fontSize: 25,
        fontFamily: 'Arial',
        textAlign: 'center',
        fontWeight:600,
    },

    subtitle: {
        fontSize: 16,
        fontWeight:600,
        color:'#D5A701',
        textAlign:'center',
    },

    subtitle2: {
        fontSize: 16,
        fontWeight:600,
        color:'#B50A0A',
        textAlign:'center',
    },

    subtitle3: {
        color:'#3465A7',
        padding: 8,
        marginTop: 21,
        textAlign: 'left',
        fontSize:16,
        fontWeight:600,
    },

    details: {
        fontSize: 16,
        color:'#00000',
        padding: 8,
        borderRadius:15,
        marginTop:46,
        marginBottom: 20,
        fontWeight:400,
        textAlign:'center',
        justifyContent:'space-evenly',
        minWidth:'auto',
        letterSpacing:1.5,
    },

    details1: {
        fontSize: 16,
        color:'#00000',
        padding: 8,
        borderRadius:15,
        marginBottom: 20,
        fontWeight:400,
        width: 550,
    },

    moveDetails: {
        backgroundColor:'#ffffff',
        padding: 8,
        borderRadius:15,
        marginTop: 21,
        marginBottom: 20,
        alignSelf:'flex-start',
        paddingHorizontal: 20,
        fontSize:16,
    },

    moveDetails2: {
        backgroundColor:'#ffffff',
        padding: 8,
        borderRadius:15,
        marginTop: 21,
        marginBottom: 20,
        fontSize:16,
        fontWeight:600,
    },

    columnWrapperTypes:{
        minWidth: 'auto',
        alignSelf:'center',
        columnGap: 10,
    },

    columnWrapper: {
        minWidth: 'auto',
        paddingHorizontal: 8,
        alignContent: 'center',
        justifyContent:'space-around',
    },

});