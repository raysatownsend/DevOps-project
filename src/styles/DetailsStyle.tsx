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
        paddingBottom: 20,
        fontWeight:600,
    },

    detailssubtitle: {
        fontSize: 20,
        fontWeight:600,
        marginBottom: 13,
    },

    detailsImage: {
        width: 177,
        height: 159,
        resizeMode: 'contain',
        alignSelf: 'center'
    },

    typeDetails: {
        color:'#ffffff',
        padding: 8,
        borderRadius:15,
        marginTop: 21,
        marginBottom: 20,
        alignItems:'center',
        alignSelf: 'center',
        alignContent: 'center',
        fontSize:16,
    },

    details: {
        fontSize: 16,
        color:'#00000',
        backgroundColor:'#ffffff',
        padding: 8,
        borderRadius:15,
        marginBottom: 20,
        fontWeight:600,
    },

    moveDetails: {
        fontSize: 16,
        color:'#00000',
        backgroundColor:'#ffffff',
        padding: 8,
        borderRadius:15,
        marginBottom: 20,
        fontWeight:600,
        
    },

    columnWrapperTypes:{
        minWidth: 'auto',
        alignSelf:'center',
        columnGap: 10,
    },

    columnWrapper: {
        minWidth: 'auto',
        justifyContent:'space-around',
        paddingHorizontal: 8,
        alignContent: 'center',
    },

});