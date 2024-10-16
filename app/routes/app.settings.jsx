import { useState } from "react";

import {
  Box,
  Card,
  Page,
  Text,
  InlineGrid,
  TextField,
  BlockStack,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";

export async function loader() {
  let settings = {
    name: "My app",
    description: "My app description",
  };
  return json(settings);
}

export async function action({request}){
  let settings = await request.formData()
  settings = {
    name: settings.get("name"),
    description: settings.get("description"),
  }
  // settings = Object.fromEntries(settings); 
  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();
  const [formState, setFromState] = useState(settings);

  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App Name"
                  name="name"
                  value={formState.name}
                  onChange={(value) =>
                    setFromState({ ...formState, name: value })
                  }
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formState.description}
                  onChange={(value) =>
                    setFromState({ ...formState, description: value })
                  }
                />
                <Button submit={true}>Submit</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}
