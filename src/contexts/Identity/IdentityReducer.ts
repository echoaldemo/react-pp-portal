export default (state: any, action: any) => {
    switch (action.type) {
      case "SET_PANEL_TAB":
        return { ...state, panel_tab: action.payload.panel_tab }
      case "LOADING":
        return { ...state, loading: action.payload.loading }
      case "SAVE_CAMPAIGN_REALMS":
        return {
          ...state,
          campaignRealms: action.payload.campaignRealms
        }
      case "SAVE_CAMPAIGN_COMPANY":
        return {
          ...state,
          campaignCompany: action.payload.campaignCompany
        }
      case "SAVE_INFO":
        return {
          ...state,
          campaignDetails: action.payload.campaign_details
        }
      case "SAVE_COMPANIES":
        return {
          ...state,
          companies: action.payload.companies
        }
      case "SAVE_REALMS":
        return {
          ...state,
          realms: action.payload.realms
        }
      case "NEW_PITCH":
        return {
          ...state,
          pitch: action.payload.new_pitch
        }
      case "CREATE_PANEL":
        return { ...state, panels: action.payload.panel }
      case "CREATE_OPTION_GROUPS":
        return { ...state, option_groups: action.payload.option_group }
      case "CREATE_OPTION":
        return { ...state, option_groups: action.payload.option }
      default:
        return null
    }
  }