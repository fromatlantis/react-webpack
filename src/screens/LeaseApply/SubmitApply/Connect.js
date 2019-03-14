import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SubmitApply from './SubmitApply'
import { actions } from '../../../redux/leaseManage'

const changePhoneNums = (state) =>{
    let companyMes= state.leaseManage.companyMessages
    let num = []
    let num2 = []
    let phonenum = ''
    
    for(let i=0;i<companyMes[0].phoneNums.length;i++){
        let a = companyMes[0].phoneNums.charAt(i)
        if(a==='['||a===']'||a==='"'){
          a=''
        }
        num[i]=a
    }
    for(let i=0;i<companyMes[0].phoneNums.length;i++){
        phonenum = phonenum + num[i]
    }

    num2 = phonenum.split(',')
    const re = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/

    for(let i=0;i<num2.length;i++){
        if(re.test(num2[i])){
            companyMes[0].phoneNums = num2[i]
        }
    }
    return companyMes;
}
const mapStateToProps = (state) => {
    return {
        user: state.authUser.user,
        companyMessages: changePhoneNums(state), //根据企业名称获取的企业信息
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //POST/ 新增企业入驻申请
        saveCompamyApply :actions('saveCompamyApply'),
        //根据企业名称获取企业相关信息
        getCompanyInfoByName: actions('getCompanyInfoByName'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitApply)