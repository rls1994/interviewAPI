//Caompany data mapper

import StateDistrictMongoose , { IStateDistrictMongoose } from '../models/state_district'
import StateDistrict from '../../model/StateDistrict'
import '../index'

class StateDistrictDataMapper {


        /*********************from mongoose to statedistrict start*****************************/
        private static _fromMongooseToStateDistrict = (StateDistrictMongoose: IStateDistrictMongoose) => {

            return new StateDistrict(
                StateDistrictMongoose.name,
                StateDistrictMongoose.districts
            )
        }
        /*********************from mongoose to statedistrict ends******************************/
    
        

    static find = async (filter: {}) => {
        const res = await StateDistrictMongoose.find(filter).exec()
        if(res.length==0) return null
        const response = res.map(it => StateDistrictDataMapper._fromMongooseToStateDistrict(it))
        return response
    }
}

export default StateDistrictDataMapper

