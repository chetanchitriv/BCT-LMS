import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState, memo } from 'react'
import axios from 'axios'
import ClassContent from './ClassContent'

const Class = () => {

  const { onClose } = useDisclosure() // For Modal
 
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [isContentModalOpen, setContentModalOpen] = useState(false);
  const [isAssignmentModalOpen, setAssignmentModalOpen] = useState(false);

    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [subject, setSubject] = useState('');
    const [room, setRoom] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [rawText, setRawText] = useState('')
    const [attachedFileUrls, setAttachedFileUrls] = useState('')
    const [title,setTitle] = useState('')
    const [instruction,setInstruction] = useState('')
    const [assignmentFileUrl,setAssignmentFileUrl] = useState('')
    const [assignmentMarks,setAssignmentMarks] = useState('')
    const [name,setName] = useState('')
    const [type,setType] = useState('')
    const [startingDate,setStartingDate] = useState('')
    const [dueDate,setDueDate] = useState('')
    const [author_id,setAuthor_id] = useState('')
    const [class_id,setClass_id] = useState('')
    

    const [data,getData] = useState([]);
    const toast = useToast();

    const handleContentModalOpen = () => {
      setContentModalOpen(true);
    };
  
    const handleContentModalClose = () => {
      setContentModalOpen(false);
    };

    const handleAssignmentModalOpen = () => {
      setAssignmentModalOpen(true);
    };
  
    const handleAssignmentModalClose = () => {
      setAssignmentModalOpen(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = {
        className,
        section,
        subject,
        room,
        joinCode,
        user,
      };
  
      axios
        .post('https://bct-backend.onrender.com/classes/create', formData)
        .then((response) => {
          // console.log(response.data);
          toast({
            title: 'Class Successfully Created',
            description: "We've created your class for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          // console.error(error);
          toast({
            title: 'Data not Found',
            description: "Please fill the data.",
            status: 'warning',
            duration: 3000,
            isClosable: true,
          })
        });
        setClassName('')
        setSection('')
        setSubject('')
        setRoom('')
        setJoinCode('')
        setUser('')
    };

  
  const handleContent = (id)=>{
    // e.preventDefault();
    // alert(id)
      const formData = {
        rawText:rawText,
        attachedFileUrls:attachedFileUrls,
        classId:id,
        userId:"123",
        posted_at:"123"
      };
      axios
        .post('https://bct-backend.onrender.com/class_contents/create', formData)
        .then((response) => {
          console.log(response.data);
          toast({
            title: 'Class Content Successfully Created',
            description: "We've created your class content for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          // console.error(error);
          toast({
            title: 'Data not Found',
            description: "Please fill the data.",
            status: 'warning',
            duration: 3000,
            isClosable: true,
          })
        });
        handleContentModalClose()
    }

    const handleAssignment = (id)=>{
      // alert(id)
      const formData = {
        title,
        instruction,
        assignmentFileUrl,
        assignmentMarks,
        name,
        type,
        startingDate,
        dueDate,
        author_id,
        class_id:id
      }
      axios
        .post('https://bct-backend.onrender.com/assignments/create', formData)
        .then((response) => {
          console.log(response.data);
          toast({
            title: 'Assignment Successfully Created',
            description: "We've created your class assignment for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          // console.error(error);
          toast({
            title: 'Connection failed',
            description: "Please check your internet connection.",
            status: 'warning',
            duration: 3000,
            isClosable: true,
          })
        });
        handleAssignmentModalClose()
    }

    let courseData = async()=>{
        try {
        let da = await axios.get('https://bct-backend.onrender.com/classes')
        getData(da.data)
        } catch (error) {
            console.log(error)  
        }
    }
    
    // data.map((el)=>{
    //     console.log(el)
    // })
    
    const handleDelete = (id) => {
        // console.log(id)
        axios
          .delete(`https://bct-backend.onrender.com/classes/${id}`)
          .then(() => {
            toast({
              title: 'Class Deleted.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            
          })
          .catch((error) => {
            toast({
              title: 'Error deleting class.',
              description: error.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
      };
    
      useEffect(()=>{
        courseData()
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
    },[handleDelete])
    
  return (
    <>
      <Box mt={'0px'}>
        <Box>
            <Box zIndex={'999'}>
                <Box m={'auto'} bg={'white'} borderRadius={'50px 50px 0px 0px'} p={'5px 20px 20px 20px'}
                // boxShadow='rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                boxShadow= 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(10, 37, 64, 0.35) 0px -2px 8px 0px inset'
                 width={'50%'}>

                  <form id='classform' onSubmit={handleSubmit}>
                  <Box m={'auto'} mb={'10px'} mt={0} width={'50%'}>
                    <Text fontSize={'26px'} fontWeight={'500'} textAlign={'center'}>Create New Class</Text>
                  </Box>
                  <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'}>
                    <Box width={'48%'}>
                        <FormControl>
                          <FormLabel fontSize={['14px','16px','18px']}>Class Name</FormLabel>
                          <Input
                            type="text"
                            value={className}
                            placeholder='Class Name'
                            border = '1px solid gray'
                            onChange={(e) => setClassName(e.target.value)}
                          />
                        </FormControl>
                    </Box>
                    <Box width={'48%'}>
                        <FormControl>
                          <FormLabel fontSize={['14px','16px','18px']}>Section</FormLabel>
                          <Input
                            type="text"
                            value={section}
                            placeholder='Section'
                            border = '1px solid gray'
                            onChange={(e) => setSection(e.target.value)}
                          />
                        </FormControl>
                    </Box>
                    <Box width={'48%'}>
                        <FormControl>
                          <FormLabel fontSize={['14px','16px','18px']}>Subject</FormLabel>
                          <Input
                            type="text"
                            value={subject}
                            placeholder='Subject'
                            border = '1px solid gray'
                            onChange={(e) => setSubject(e.target.value)}
                          />
                        </FormControl>
                    </Box>
                    <Box width={'48%'}>
                        <FormControl>
                          <FormLabel fontSize={['14px','16px','18px']}>Room</FormLabel>
                          <Input
                            type="text"
                            value={room}
                            placeholder='Room'
                            border = '1px solid gray'
                            onChange={(e) => setRoom(e.target.value)}
                          />
                        </FormControl>
                    </Box>
                    <Box width={'48%'}>
                        <FormControl>
                          <FormLabel fontSize={['14px','16px','18px']}>Join Code</FormLabel>
                          <Input
                            type="text"
                            value={joinCode}
                            placeholder='Join Code'
                            border = '1px solid gray'
                            onChange={(e) => setJoinCode(e.target.value)}
                          />
                        </FormControl>
                    </Box>
                    <Box width={'48%'}>
                        <FormControl>
                          <FormLabel fontSize={['14px','16px','18px']}>User</FormLabel>
                          <Input
                            type="text"
                            value={user}
                            placeholder='User'
                            border = '1px solid gray'
                            onChange={(e) => setUser(e.target.value)}
                          />
                        </FormControl>
                    </Box>
                        </Box>
                        <Flex justifyContent={'space-evenly'}>
                          <Button mt={'1rem'} fontSize={'18px'} bg={'teal.500'} _hover={{color:'white', bg:'teal.700'}} color={'white'} type="submit">Create Class</Button>
                        </Flex>
                  </form>
                </Box>
            </Box>
            <Box width={'95%'} m={'auto'}>
              <Text fontSize={'24px'} textDecoration={'underline'} color={'orange.800'} fontWeight={'500'}>Existing Classes</Text>
            </Box>
            
            <Box m={'auto'} width={'95%'} border={'2px solid'} borderRadius={'1rem'} boxShadow={'rgba(10, 37, 64, 0.35) 0px -2px 15px 0px inset'}>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Course by Binary Code Technologies</TableCaption>
                    <Thead>
                    <Tr bg={'gray.700'}>
                      <Th color={'white'} fontSize={['0.6','0.8','0.9rem']} borderRadius={'1rem 0 0 0'}>Sr. No.</Th>
                      <Th color={'white'} fontSize={['0.6','0.8','0.9rem']}>Class Name</Th>
                      <Th color={'white'} fontSize={['0.6','0.8','0.9rem']}>Subject</Th>
                      <Th color={'white'} fontSize={['0.6','0.8','0.9rem']}>Start Date</Th>
                      <Th color={'white'} fontSize={['0.6','0.8','0.9rem']}>Class Code</Th>
                      <Th color={'white'} fontSize={['0.6','0.8','0.9rem']}></Th>
                      <Th color={'white'} fontSize={['0.6','0.8','0.9rem']}>Actions</Th>
                      <Th color={'white'} fontSize={['0.6','0.8','0.9rem']} borderRadius={'0 1rem 0 0'}></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {    

                            data.map((el,i)=>{
                              if (isLoading) {
                                return (
                                  
                                    <Spinner
                                      thickness='4px'
                                      speed='1s'
                                      emptyColor='gray.200'
                                      color='blue.500'
                                      size='xl'
                                    />
                                  
                                );
                              }
                              const createdAtDate = new Date(el.createdAt);
                              const formattedDate = createdAtDate.toLocaleDateString();
                                return(
                                <Tr key={el._id} bg={'white'}>
                                    <Td borderBottom={'1px solid gray'}>{i+1}</Td>
                                    <Td borderBottom={'1px solid gray'}>{el.className}</Td>
                                    <Td borderBottom={'1px solid gray'}>{el.subject}</Td>
                                    <Td borderBottom={'1px solid gray'}>{formattedDate}</Td>
                                    <Td borderBottom={'1px solid gray'}>{el.joinCode}</Td>
                                    {/* <Td><Button onClick={()=>handleDelete(el._id)}>Delete</Button></Td> */}
                                    
                                    <Td borderBottom={'1px solid gray'}>
                                      <Box>
                                      <Button onClick={handleContentModalOpen} bg={'gray.700'} color={'white'} _hover={{bg:'gray.800'}}>Add Content</Button>
                                      <form>
                                        <Modal
                                          isOpen={isContentModalOpen}
                                          onClose={handleContentModalClose}
                                          
                                        >
                                          <ModalOverlay />
                                          <ModalContent>
                                            <ModalHeader>Add New Class Content</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody pb={6}>
                                          
                                              <FormControl>
                                                <FormLabel>Title</FormLabel>
                                                <Input  placeholder='Title' onChange={(e)=>setRawText(e.target.value)} required/>
                                              </FormControl>

                                              <FormControl mt={4}>
                                                <FormLabel>URL</FormLabel>
                                                <Input required placeholder='Enter Url' onChange={(e)=>setAttachedFileUrls(e.target.value)}/>
                                              </FormControl>
                                              
                                            </ModalBody>

                                            <ModalFooter>
                                              <Button colorScheme='blue' mr={3} onClick={()=>rawText==="" ? handleContentModalOpen : handleContent(el._id)}>
                                                Save
                                              </Button>
                                              <Button onClick={handleContentModalClose}>Cancel</Button>
                                              
                                            </ModalFooter>
                                          </ModalContent>
                                        </Modal>
                                        </form>
                                      </Box>
                                    </Td>
                                    <Td borderBottom={'1px solid gray'}>
                                      <Box>
                                      <Button onClick={handleAssignmentModalOpen} bg={'gray.700'} color={'white'} _hover={{bg:'gray.800'}}>Add Assignment</Button>
                                      <form>
                                        <Modal
                                          isOpen={isAssignmentModalOpen}
                                          onClose={handleAssignmentModalClose}
                                          scrollBehavior='inside'
                                        >
                                          <ModalOverlay />
                                          <ModalContent>
                                            <ModalHeader>Add New Assignment</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody pb={6}>
                                           
                                                <FormControl>
                                                  <FormLabel>Title</FormLabel>
                                                  <Input  placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
                                                </FormControl>
                                             
                                              <FormControl mt={4}>
                                                <FormLabel>Instruction</FormLabel>
                                                <Input placeholder='Instruction' onChange={(e)=>setInstruction(e.target.value)}/>
                                              </FormControl>
                                            

                                              <FormControl mt={4}>
                                                <FormLabel>Assignment URL</FormLabel>
                                                <Input placeholder='Enter Url' onChange={(e)=>setAssignmentFileUrl(e.target.value)}/>
                                              </FormControl>

                                              <FormControl mt={4}>
                                                <FormLabel>Assignment Marks</FormLabel>
                                                <Input placeholder='Assignment Marks' onChange={(e)=>setAssignmentMarks(e.target.value)}/>
                                              </FormControl>

                                              <FormControl mt={4}>
                                                <FormLabel>Assignment Name</FormLabel>
                                                <Input placeholder='Assignment Name' onChange={(e)=>setName(e.target.value)}/>
                                              </FormControl>

                                              <FormControl mt={4}>
                                                <FormLabel>Assignment Type</FormLabel>
                                                <Input placeholder='Assignment Type' onChange={(e)=>setType(e.target.value)}/>
                                              </FormControl>

                                              <FormControl mt={4}>
                                                <FormLabel>Starting Date</FormLabel>
                                                <Input placeholder='Assignment Type' onChange={(e)=>setStartingDate(e.target.value)}/>
                                              </FormControl>

                                              <FormControl mt={4}>
                                                <FormLabel>Due Date</FormLabel>
                                                <Input placeholder='Due date' onChange={(e)=>setDueDate(e.target.value)}/>
                                              </FormControl>

                                              <FormControl mt={4}>
                                                <FormLabel>Author Id</FormLabel>
                                                <Input placeholder='Author Id' onChange={(e)=>setAuthor_id(e.target.value)}/>
                                              </FormControl>
                                              
                                            </ModalBody>

                                            <ModalFooter>
                                              <Button colorScheme='blue' mr={3} onClick={()=>handleAssignment(el._id)}>
                                                Save
                                              </Button>
                                              <Button onClick={handleAssignmentModalClose}>Cancel</Button>
                                              
                                            </ModalFooter>
                                          </ModalContent>
                                        </Modal>
                                        </form>
                                      </Box>
                                    </Td>
                                    <Td borderBottom={'1px solid gray'}>
                                      <Button bg={'red.500'} color={'white'} _hover={{bg:'red.700'}} onClick={()=>handleDelete(el._id)}>
                                          Delete Class
                                        </Button>
                                    </Td>
                                </Tr>
                                )
                            })   
                        }
                    </Tbody>
                    
                    {/* <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                    </Tfoot> */}
                </Table>
                </TableContainer>
              
            </Box>
        </Box>
      </Box>
    </>
  )
}

export default Class
