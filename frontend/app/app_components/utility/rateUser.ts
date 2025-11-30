// // Modal.tsx

// import React, { FC, PropsWithChildren, ReactNode } from 'react';
// import { Modal, View, Text, Button, StyleSheet } from 'react-native';

// // Define the props interface
// interface CustomModalProps {
//   isVisible: boolean;
//   onClose: () => void;
//   title?: string;
//   // Explicitly define children as ReactNode
//   children: ReactNode; // <--- The key change
// }

// // Use FC (Function Component) with the explicit interface
// const CustomModal: FC<CustomModalProps> = ({
//   isVisible,
//   onClose,
//   children,
//   title
// }) => {
//   return (
//     <Modal
//       animationType="slide" 
//       transparent={true}
//       visible={isVisible}
//       onRequestClose={onClose}
//     >
//       {/* ... rest of the modal structure ... */}
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           {/* Header */}
//           {title && <Text style={styles.modalTitle}>{title}</Text>}
          
//           {/* Content passed from the parent component */}
//           {children} {/* This accepts the ReactNode */}

//           {/* Close Button */}
//           <Button title="Close" onPress={onClose} />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// // 3. Keep styles defined as before (TypeScript infers types for StyleSheet)
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
// });

// export default CustomModal;