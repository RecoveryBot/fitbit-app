function settings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">My App Settings</Text>}
      >
        <TextInput
          label="My Email"
          settingsKey="email"
        >
        </TextInput>
      </Section>
    </Page>
  );
}

registerSettingsPage(settings);
