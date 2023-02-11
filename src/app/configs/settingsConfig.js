import themesConfig from './themesConfig';
import i18n from '../../i18n';

const settingsConfig = {
  "customScrollbars": true,
  "direction": "ltr",
  "theme": {
    "main": {
      "palette": {
        "mode": "light",
        "text": {
          "primary": "rgb(17, 24, 39)",
          "secondary": "rgb(107, 114, 128)",
          "disabled": "rgb(149, 156, 169)"
        },
        "common": {
          "black": "rgb(17, 24, 39)",
          "white": "rgb(255, 255, 255)"
        },
        "primary": {
          "light": "rgb(255, 255, 255)",
          "main": "#ffffff",
          "dark": "rgb(204, 204, 204)",
          "contrastDefaultColor": "light",
          "contrastText": "rgba(0, 0, 0, 0.87)"
        },
        "secondary": {
          "light": "rgb(204, 204, 204)",
          "main": "#000000",
          "dark": "rgb(0, 0, 0)",
          "contrastText": "#fff"
        },
        "background": {
          "paper": "#ffffff",
          "default": "#f2f2f2"
        },
        "error": {
          "light": "#ffcdd2",
          "main": "#f44336",
          "dark": "#b71c1c"
        },
        "divider": "#e2e8f0",
        "status": {
          "danger": "orange"
        }
      },
      "status": {
        "danger": "orange"
      }
    },
    "navbar": {
      "palette": {
        "mode": "dark",
        "text": {
          "primary": "rgb(255,255,255)",
          "secondary": "rgb(148, 163, 184)",
          "disabled": "rgb(156, 163, 175)"
        },
        "common": {
          "black": "rgb(17, 24, 39)",
          "white": "rgb(255, 255, 255)"
        },
        "primary": {
          "light": "rgb(204, 204, 204)",
          "main": "#000000",
          "dark": "rgb(0, 0, 0)",
          "contrastDefaultColor": "light",
          "contrastText": "#fff"
        },
        "secondary": {
          "light": "rgb(255, 255, 255)",
          "main": "#ffffff",
          "dark": "rgb(204, 204, 204)",
          "contrastText": "rgba(0, 0, 0, 0.87)"
        },
        "background": {
          "paper": "#292929",
          "default": "#000000"
        },
        "error": {
          "light": "#ffcdd2",
          "main": "#f44336",
          "dark": "#b71c1c"
        },
        "divider": "#e2e8f0",
        "status": {
          "danger": "orange"
        }
      },
      "status": {
        "danger": "orange"
      }
    },
    "toolbar": {
      "palette": {
        "mode": "light",
        "text": {
          "primary": "rgb(17, 24, 39)",
          "secondary": "rgb(107, 114, 128)",
          "disabled": "rgb(149, 156, 169)"
        },
        "common": {
          "black": "rgb(17, 24, 39)",
          "white": "rgb(255, 255, 255)"
        },
        "primary": {
          "light": "#92979f",
          "main": "#252f3e",
          "dark": "#161d28",
          "contrastDefaultColor": "light",
          "contrastText": "rgb(255,255,255)"
        },
        "secondary": {
          "light": "rgb(204, 254, 204)",
          "main": "#00fe00",
          "dark": "rgb(0, 203, 0)",
          "contrastText": "rgba(0, 0, 0, 0.87)"
        },
        "background": {
          "paper": "#FFFFFF",
          "default": "#f6f7f9"
        },
        "error": {
          "light": "#ffcdd2",
          "main": "#f44336",
          "dark": "#b71c1c"
        },
        "divider": "#e2e8f0",
        "status": {
          "danger": "orange"
        }
      },
      "status": {
        "danger": "orange"
      }
    },
    "footer": {
      "palette": {
        "mode": "light",
        "text": {
          "primary": "rgb(17, 24, 39)",
          "secondary": "rgb(107, 114, 128)",
          "disabled": "rgb(149, 156, 169)"
        },
        "common": {
          "black": "rgb(17, 24, 39)",
          "white": "rgb(255, 255, 255)"
        },
        "primary": {
          "light": "rgb(204, 204, 204)",
          "main": "#000000",
          "dark": "rgb(0, 0, 0)",
          "contrastDefaultColor": "light",
          "contrastText": "#fff"
        },
        "secondary": {
          "light": "rgb(204, 254, 204)",
          "main": "#00fe00",
          "dark": "rgb(0, 203, 0)",
          "contrastText": "rgba(0, 0, 0, 0.87)"
        },
        "background": {
          "paper": "#FFFFFF",
          "default": "#f6f7f9"
        },
        "error": {
          "light": "#ffcdd2",
          "main": "#f44336",
          "dark": "#b71c1c"
        },
        "divider": "#e2e8f0",
        "status": {
          "danger": "orange"
        }
      },
      "status": {
        "danger": "orange"
      }
    }
  },
  "layout": {
    "style": "layout1",
    "config": {
      "mode": "container",
      "containerWidth": "1544",
      "navbar": {
        "display": true,
        "style": "style-1",
        "folded": true,
        "position": "left"
      },
      "toolbar": {
        "display": true,
        "style": "fixed",
        "position": "below"
      },
      "footer": {
        "display": true,
        "style": "fixed"
      },
      "leftSidePanel": {
        "display": true
      },
      "rightSidePanel": {
        "display": true
      },
      "scroll": "content"
    }
  },
  "defaultAuth": [
    "admin"
  ],
  "loginRedirectUrl": "/"
}

export default settingsConfig;
