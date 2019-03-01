import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddBuilding from './AddBuilding'
import { actions } from '../../../redux/houseManage'

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
         //添加楼宇信息 
        AddBuilding: actions('AddBuilding'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBuilding)