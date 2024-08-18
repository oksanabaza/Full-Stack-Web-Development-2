import SiteHeader from "../components/siteHeader";
import { MemoryRouter } from "react-router";
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

const meta = {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider theme={defaultTheme}>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    theme: defaultTheme,
    toggleTheme: () => console.log("Theme toggled"),
  },
};

Basic.storyName = "Default";
