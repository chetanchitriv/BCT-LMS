import React, { memo, useEffect, useState } from 'react';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Class from './Class';
import Assignments from './Assignments';
import ClassContent from './ClassContent';

const Sections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Box>
        <Box width={'95%'} m={'auto'}>
          <Tabs variant='line' index={activeTab} onChange={handleTabChange}>
            <Box width={'fit-content'} m={'auto'}>
              <TabList mb='1em'>
                <Flex gap={'5rem'}>
                  <Tab fontSize={['16px','18px','20px']} fontWeight={'500'}>Classes</Tab>
                  <Tab fontSize={['16px','18px','20px']} fontWeight={'500'}>View Assignments</Tab>
                  <Tab fontSize={['16px','18px','20px']} fontWeight={'500'}>View Class Contents</Tab>
                </Flex>
              </TabList>
            </Box>
            <TabPanels>
              <TabPanel>
                <Class />
              </TabPanel>
              <TabPanel>
                <Assignments />
              </TabPanel>
              <TabPanel>
                <ClassContent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default Sections;
