// ui
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { FundingContent, useFunding } from "components/funding";

export function FundingDetails() {
  // config
  const {
    state: { config }
  } = useFunding();

  const hasFaqs = !!config?.faqs?.[0];
  return (
    <Tabs>
      <TabList>
        <Tab>About</Tab>
        {hasFaqs && <Tab>FAQ</Tab>}
      </TabList>

      <TabPanels>
        {/* About */}
        <TabPanel>
          <FundingContent>{config?.about}</FundingContent>
        </TabPanel>
        {/* FAQ */}
        {hasFaqs && (
          <TabPanel>
            <Accordion>
              {config?.faqs?.map((faq: any, idx: number) => (
                <AccordionItem key={idx}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {faq?.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{faq?.answer}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
}
