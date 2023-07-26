import { Box, Button, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState, memo } from 'react'

const Assignments = () => {

  const [data,getData] = useState([])
  const toast = useToast();

    let assignmentData = async()=>{
        try {
        let da = await axios.get('https://bct-backend.onrender.com/assignments')
        console.log(da.data);
        getData(da.data)
        } catch (error) {
            console.log(error)  
        }
    }

      const handleDelete = (id) => {
        // console.log(id)
        axios
          .delete(`https://bct-backend.onrender.com/assignments/${id}`)
          .then(() => {
            toast({
              title: 'Assignment Deleted.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            assignmentData()
          })
          .catch((error) => {
            toast({
              title: 'Error deleting assignment.',
              description: error.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
      };
    

    useEffect(()=>{
        assignmentData()
    },[])


  return (
    <>
      <Box>
      <Box m={'auto'} width={'95%'} border={'2px solid'} borderRadius={'1rem'} boxShadow={'rgba(10, 37, 64, 0.35) 0px -2px 15px 0px inset'}>
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Assignments</TableCaption>
              <Thead>
                <Tr bg={'gray.700'}>
                  <Th color={'white'} fontSize={'14px'} borderRadius={'10px 0px 0px 0px'}>Title</Th>
                  <Th color={'white'} fontSize={'14px'}>Type</Th>
                  <Th color={'white'} fontSize={'14px'}>Name</Th>
                  <Th color={'white'} fontSize={'14px'}>Class Id</Th>
                  <Th color={'white'} fontSize={'14px'}>Created Date</Th>
                  <Th color={'white'} fontSize={'14px'}>Instruction</Th>
                  <Th color={'white'} fontSize={'14px'} borderRadius={'0px 10px 0px 0px'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  data.map((el)=>{
                    return (
                    <Tr key={el._id} bg={'white'}>
                      <Td borderBottom={'1px solid gray'}>{el.title}</Td>
                      <Td borderBottom={'1px solid gray'}>{el.type}</Td>
                      <Td borderBottom={'1px solid gray'}>{el.name}</Td>
                      <Td borderBottom={'1px solid gray'}>{el.class_id}</Td>
                      <Td borderBottom={'1px solid gray'}>{el.createdAt}</Td>
                      <Td borderBottom={'1px solid gray'}>{el.instruction}</Td>
                      <Td borderBottom={'1px solid gray'}>
                        <Button bg={'red.500'} color={'white'} _hover={{bg:'red.700'}} onClick={()=>handleDelete(el._id)}>
                          Delete Assignment
                        </Button>
                      </Td>
                    </Tr>
                  )})
                }
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}

export default memo(Assignments)
