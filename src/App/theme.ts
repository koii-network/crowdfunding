import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  // Global Styles
  styles: {
    global: {
      "html, body, #root": {
        height: "100%"
      }
    }
  },

  // Colors
  colors: {
    black: {
      500: "#000"
    },
    blue: {
      "50": "#E6E6F8",
      "100": "#CACAF0",
      "200": "#9292E1",
      "300": "#5A5AD1",
      "400": "#3131B3",
      "500": "#22227B",
      "600": "#1E1E6B",
      "700": "#19195B",
      "800": "#15154B",
      "900": "#10103B"
    },
    teal: {
      "50": "#D9F4F2",
      "100": "#C3EEEB",
      "200": "#98E2DD",
      "300": "#6CD5CE",
      "400": "#40C9C0",
      "500": "#2EA39B",
      "600": "#25837D",
      "700": "#1C635E",
      "800": "#134440",
      "900": "#0A2422"
    },
    red: {
      "50": "#FFE8EC",
      "100": "#FFD6DD",
      "200": "#FFB3C0",
      "300": "#FE8FA3",
      "400": "#FE6C86",
      "500": "#FE4869",
      "600": "#FE153F",
      "700": "#DF0129",
      "800": "#AC0120",
      "900": "#790117"
    },
    gray: {
      "50": "#FAFAFA",
      "100": "#F4F4F5",
      "200": "#E4E4E7",
      "300": "#D4D4D8",
      "400": "#A1A1AA",
      "500": "#71717A",
      "600": "#52525B",
      "700": "#3F3F46",
      "800": "#27272A",
      "900": "#18181B"
    }
  },
  fonts: {
    body: "IBM Plex Sans, sans-serif",
    heading: "IBM Plex Sans, sans-serif"
  },
  shadows: {
    card: "-3px 9px 48px -3px rgba(0, 0, 0, 0.1)",
    xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  },
  // Components
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
        size: "sm"
      }
    },
    Input: {
      defaultProps: {
        size: "sm"
      }
    },
    FormLabel: {
      baseStyle: {
        marginBottom: "1",
        fontWeight: "600",
        fontSize: "sm"
      }
    },
    FormError: {
      baseStyle: {
        text: {
          mt: 1,
          fontSize: "xs"
        }
      }
    },
    // Menu
    Menu: {
      baseStyle: {
        item: {
          borderRadius: 4
        },
        list: {
          px: 2,
          borderWidth: "1px",
          borderColor: "gray.100",
          shadow: "sm",
          zIndex: 999
        }
      }
    },
    Modal: {
      defaultProps: {
        isCentered: true
      },
      baseStyle: {
        dialogContainer: {
          // alignItems: "flex-start"
        }
      }
    },
    Accordion: {
      baseStyle: {
        container: {
          borderTopWidth: "0px",
          borderBottomWidth: "1px",
          _last: {
            borderBottomWidth: "0px"
          }
        },
        icon: {
          marginLeft: "auto"
        },
        button: {
          fontSize: "lg",
          fontWeight: "600",
          textAlign: "left",
          px: 0,
          py: "4",
          _focus: {
            boxShadow: "none"
          },
          _hover: {
            bg: "transparent"
          }
        },
        panel: {
          pb: "4",
          pl: "4",
          px: 0,
          pt: 0,
          fontSize: "sm"
        }
      }
    },
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: "#237B75",
          rounded: "2xl",
          boxShadow: "4px 0px 12px rgba(23, 23, 83, 0.25)"
        }
      }
    }
  }
});
