export const getCampaigns = (state = {}, action) => {
    switch(action.type){
        case true:
            return {
                ...state,
                campaigns: action.payload
            }
        default:
            return state;
    }
}