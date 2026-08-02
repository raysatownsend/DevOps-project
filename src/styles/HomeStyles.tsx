import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    height: 50,
    alignContent:'space-around',
    display:'flex',
    flexDirection:'row',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 150,
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  flatListContent: {
    paddingVertical: 12,
  },
  filters: {
      width:25,
      height:25,
      display:'flex',
      alignSelf: 'flex-end',
      margin: 10,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  gridImage: {
    width: '100%',
    height: 150,
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  modalCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textInput: {
    borderStyle: 'solid',
    borderColor:'#aaaa',
    borderWidth: 2,
    height:35,
    width: 250,
    borderRadius:15,
    alignSelf:'center',
    display:'flex',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  filterHeader: {
    fontSize:16,
    padding: 35,
    fontWeight:700,

  },

  filterOptions: {
    fontSize:14,
    justifyContent:'space-between',
    flexDirection:'row',
    textAlign:'center',
    position:'relative',
    padding:35,
  },

  filterButton: {
    fontSize:20,
    padding: 25,
    fontWeight:700,

  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
 });
