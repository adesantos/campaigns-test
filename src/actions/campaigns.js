import axios from "axios";

function campaigns(res){
    return{ type: true, payload: res}
}
export function getCampaigns(){

    return dispatch => {
        axios.get('https://www.plugco.in/public/take_home_sample_feed')
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
           // console.log(res);
            dispatch(campaigns(res.data.campaigns));
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
}