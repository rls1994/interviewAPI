// State district Controller

import StateDistrictDataMapper from '../db/datamapper/StateDistrictDataMapper'
import { AuthenticationError } from '../../Error/AppError';
import StateDistrict from '../model/StateDistrict';

class StateDistrictController {

    static getData = async(filter:string) => {
        let newFilter:any = {}
        if(filter.length>0) newFilter.name = filter
        const response = await StateDistrictDataMapper.find(newFilter);

        return response;
    }
}

export default StateDistrictController
