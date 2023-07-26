import { Box, Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState, memo } from 'react';

const ClassContent = () => {
  const [data, getData] = useState([]);
  const toast = useToast();

  const classContentData = async () => {
    try {
      let da = await axios.get('https://bct-backend.onrender.com/class_contents');
      getData(da.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://bct-backend.onrender.com/class_contents/${id}`)
      .then(() => {
        toast({
          title: 'Class Content Deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Refresh the data after deletion
        classContentData();
      })
      .catch((error) => {
        toast({
          title: 'Error deleting content.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  data.map((el)=>{
    console.log(el)
  })

  useEffect(() => {
    classContentData();
  }, []); // Run once after the initial render

  return (
    <>
      <Box>
      <Box m={'auto'} width={'95%'} border={'2px solid'} borderRadius={'1rem'} boxShadow={'rgba(10, 37, 64, 0.35) 0px -2px 15px 0px inset'}>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Class Contents</TableCaption>
            <Thead>
              <Tr bg={'gray.700'} color={'white'}>
                <Th color={'white'} fontSize={'14px'} borderRadius={'10px 0px 0px 0px'}>Title</Th>
                <Th color={'white'} fontSize={'14px'}>URL</Th>
                <Th color={'white'} fontSize={'14px'}>Class Id</Th>
                <Th color={'white'} fontSize={'14px'}>User Id</Th>
                <Th color={'white'} fontSize={'14px'}>Created Date</Th>
                <Th color={'white'} fontSize={'14px'} borderRadius={'0px 10px 0px 0px'}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((el) => (
                <Tr key={el._id} bg={'white'}>
                  <Td borderBottom={'1px solid gray'}>{el.rawText}</Td>
                  <Td borderBottom={'1px solid gray'}>{el.attachedFileUrls}</Td>
                  <Td borderBottom={'1px solid gray'}>{el.classId}</Td>
                  <Td borderBottom={'1px solid gray'}>{el.userId}</Td>
                  <Td borderBottom={'1px solid gray'}>{el.createdAt}</Td>
                  <Td borderBottom={'1px solid gray'}>
                    <Button bg={'red.500'} color={'white'} _hover={{ bg: 'red.700' }} onClick={() => handleDelete(el._id)}>
                      Delete Content
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default memo(ClassContent);
